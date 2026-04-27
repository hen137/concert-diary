import type {
  IUserData,
  IUserCursor,
} from '../../../../../types/query_data.js';
import type { Server } from '../../../../../index.js';

import z from 'zod';
import { getFollowersSchema } from '../../../../../schemas/users.schema.js';
import { userCursorSchema } from '../../../../../schemas/snippets/pagination.schema.js';
import { logger } from '../../../../../utils/logger.utils.js';
import {
  formatUsersPayload,
  validateCursorLimit,
} from '../../../../../utils/pagination.utils.js';
import {
  dataNotFoundResponse,
  getPaginationErrorResponse,
} from '../../../../../utils/error_responses.utils.js';

type ErrorResponse =
  | z.infer<(typeof getFollowersSchema.response)[400]>
  | z.infer<(typeof getFollowersSchema.response)[500]>;

type NotFoundResponse = z.infer<(typeof getFollowersSchema.response)[404]>;

export default async function (server: Server) {
  server.setErrorHandler((error, request, response): ErrorResponse => {
    if (!(process.env.NODE_ENV === 'test')) logger.error(error);

    const { code, errorResponse } = getPaginationErrorResponse(error);

    response.code(code);
    return errorResponse;
  });

  server.setNotFoundHandler((request, response): NotFoundResponse => {
    response.code(404);
    return dataNotFoundResponse;
  });

  server.get('', { schema: getFollowersSchema }, async (request, response) => {
    // CONSIDER: add support for offset/page pagination
    // TODO: implement sorting and filtering
    // TODO: add support for first and last page cursors

    //extract query params
    const { cursor, limit } = validateCursorLimit(
      request.query.cursor,
      request.query.limit,
      userCursorSchema
    );
    const { userId } = request.params;

    // data variables
    let userData: IUserData[];
    let prevUserData: IUserCursor[] = [];

    // build query
    const query = server.db
      .selectFrom('user_relationships')
      .innerJoin(
        (eb) =>
          eb
            .selectFrom('user_accounts')
            .innerJoin(
              'user_profiles',
              'user_accounts.user_id',
              'user_profiles.user_id'
            )
            .select([
              'user_accounts.user_id',
              'user_accounts.created_at',
              'user_accounts.username',
              'user_profiles.first_name',
              'user_profiles.last_name',
              'user_profiles.avatar_url',
            ])
            .as('users'),
        (join) =>
          join.onRef('user_relationships.initiator_id', '=', 'users.user_id')
      )
      .selectAll('users')
      .where('user_relationships.target_id', '=', userId)
      .orderBy('users.created_at', 'desc')
      .orderBy('users.user_id', 'desc')
      .limit(limit + 1);

    if (cursor) {
      const {
        userId,
        // createdAt
      } = cursor;

      userData = await query
        .where('users.user_id', '<', userId)
        // .where('users.created_at', '<', createdAt)
        .execute();

      // no records following userId
      if (!userData.length) response.callNotFound();

      prevUserData = await server.db
        .selectFrom('user_relationships')
        .innerJoin(
          (eb) =>
            eb
              .selectFrom('user_accounts')
              .select(['user_accounts.user_id', 'user_accounts.created_at'])
              .as('users'),
          (join) =>
            join.onRef('user_relationships.initiator_id', '=', 'users.user_id')
        )
        .selectAll('users')
        .where('user_relationships.target_id', '=', userId)
        // .where('users.created_at', '>', createdAt)
        .where('users.user_id', '>', userId)
        .orderBy('users.created_at', 'asc')
        .orderBy('users.user_id', 'asc')
        .limit(limit)
        .execute();

      if (!prevUserData)
        throw new Error(
          'Data integrity error: cursor points to non-existent data'
        );
    } else {
      userData = await query.execute();
    }

    const payload = formatUsersPayload(cursor, limit, userData, prevUserData);

    return payload;
  });
}
