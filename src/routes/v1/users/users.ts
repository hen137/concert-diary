import type { IUserData, IUserCursor } from '../../../types/query_data.js';
import type { Server } from '../../../index.js';

import z from 'zod';
import { getUserListSchema } from '../../../schemas/users.schema.js';
import { userCursorSchema } from '../../../schemas/snippets/pagination.schema.js';
import { logger } from '../../../utils/logger.utils.js';
import {
  formatUsersPayload,
  validateCursorLimit,
} from '../../../utils/pagination.utils.js';
import {
  getPaginationErrorResponse,
  dataNotFoundResponse,
} from '../../../utils/error_responses.utils.js';

type ErrorResponse =
  | z.infer<(typeof getUserListSchema.response)[400]>
  | z.infer<(typeof getUserListSchema.response)[500]>;

type NotFoundResponse = z.infer<(typeof getUserListSchema.response)[404]>;

export default async function usersRoutes(server: Server) {
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

  server.get('', { schema: getUserListSchema }, async (request, response) => {
    // CONSIDER: add support for offset/page pagination
    // TODO: implement sorting and filtering
    // TODO: add support for first and last page cursors

    // extract query params
    const { cursor, limit } = validateCursorLimit(
      request.query.cursor,
      request.query.limit,
      userCursorSchema
    );

    // data variables
    let userData: IUserData[];
    let prevUserData: IUserCursor[] = [];

    // build query
    const query = server.db
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
      .limit(limit + 1);

    if (cursor) {
      const {
        userId,
        // createdAt,
      } = cursor;

      // OPTIMIZE: retireve this cursor and previous cursor in a single query
      userData = await query
        .where('user_accounts.user_id', '<', userId)
        // .where('user_accounts.created_at', '<', createdAt)
        .orderBy('user_accounts.created_at', 'desc')
        .orderBy('user_accounts.user_id', 'desc')
        .execute();

      // no records following userId
      if (!userData.length) return response.callNotFound();

      prevUserData = await server.db
        .selectFrom('user_accounts')
        .select(['user_id', 'created_at'])
        .where('user_id', '>', userId)
        // .where('created_at', '>', createdAt)
        .orderBy('created_at', 'asc')
        .orderBy('user_id', 'asc')
        .limit(limit + 1)
        .execute();

      // if (!prevUserData)
      // throw new Error(
      //   'Data integrity error: cursor points to non-existent data'
      // );
    } else {
      userData = await query.execute();
    }

    const payload = formatUsersPayload(cursor, limit, userData, prevUserData);

    return payload;
  });
}
