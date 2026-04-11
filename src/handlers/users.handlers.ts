import type { FastifyReply, FastifyRequest } from 'fastify'
import type {
  getFollowersSchema,
  getFollowingSchema,
  getUserListSchema,
  getUserSchema,
  registerUserSchema,
  updateUserSchema,
} from '../schemas/users.schema.js'

import z from 'zod'
import { logger } from '../utils/logger.utils.js'
import { cursorSchema } from '../schemas/snippets/pagination.schema.js'

// getUserList
type GetUserListReply = {
  [statusCode in keyof typeof getUserListSchema.response]: z.infer<
    (typeof getUserListSchema.response)[statusCode]
  >
}

export async function getUserListErrorHandler(
  error: Error,
  request: FastifyRequest<{
    Querystring: z.infer<typeof getUserListSchema.querystring>
    Reply: GetUserListReply
  }>,
  response: FastifyReply<{
    Reply: GetUserListReply
  }>
) {
  logger.error(error)
  if (
    error instanceof DOMException || // invalid base64 encoding of cursor
    error instanceof SyntaxError || // invalid JSON from decoded cursor
    error instanceof z.ZodError // invalid object members in decoded cursor
  ) {
    response.code(400)
    return {
      error: 'Bad request',
      message: 'Malformed cursor',
    }
  }
  // else if (error instanceof ERROR) {
  //   response.code(number)
  //   return {}
  // }
  else {
    response.code(500)
    return {
      error: 'Internal Server Error',
    }
  }
}

export async function getUserListNotFoundHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof getUserListSchema.querystring>
    Reply: GetUserListReply
  }>,
  response: FastifyReply<{
    Reply: GetUserListReply
  }>
) {
  return response.code(404).send({
    error: 'Not found',
    message: 'User does not exist',
  })
}

export async function getUserListHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof getUserListSchema.querystring>
    Reply: GetUserListReply
  }>,
  response: FastifyReply<{
    Reply: GetUserListReply
  }>
) {
  // CONSIDER: add support for offset/page pagination
  // TODO: implement sorting and filtering
  // TODO: add support for first and last page cursors

  // extract query params
  const { cursor } = request.query
  const limit = Math.min(Math.max(request.query.limit, 1), 100)

  // data variables
  let accountData: {
    user_id: string
    created_at: Date
    username: string
    avatar_url: string | null
    first_name: string
    last_name: string
  }[]
  let prevAccountData: { user_id: string; created_at: Date }[] = []

  // build query
  const query = request.server.db
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
    .orderBy('user_accounts.created_at', 'desc')
    .orderBy('user_accounts.user_id', 'desc')
    .limit(limit + 1)

  if (cursor) {
    // decode cursor
    const cursorDecoded = JSON.parse(atob(cursor))

    // validate cursor contents
    const { userId, createdAt } = cursorSchema.parse(cursorDecoded)

    // OPTIMIZE: retireve this cursor and previous cursor in a single query
    // query data within cursor window
    accountData = await query
      .where('user_accounts.created_at', '<', createdAt)
      .where('user_accounts.user_id', '<', userId)
      .execute()

    //  TODO: validate userId exists
    // validate existance of supplied userId
    // logger.debug(accountData.length)
    // if (!accountData.length) {
    //   return response.callNotFound()
    // }

    // FIX: see optimize above
    prevAccountData = await request.server.db
      .selectFrom('user_accounts')
      .select(['user_id', 'created_at'])
      .where('created_at', '>', createdAt)
      .where('user_id', '>', userId)
      .orderBy('created_at', 'asc')
      .orderBy('user_id', 'asc')
      .limit(limit)
      .execute()
  } else {
    accountData = await query.execute()
  }

  // format data
  let data = []
  for (const account of accountData) {
    data.push({
      user_id: account.user_id,
      username: account.username,
      full_name: `${account.first_name} ${account.last_name}`,
      // TODO: calculate followers/following count
      followers_count: 0,
      following_count: 0,
      avatar_url: account.avatar_url ?? '',
      api_path: `${request.server.prefix}/${account.user_id}`,
      created_at: account.created_at,
    })
  }

  // format next cursor
  const next_cursor =
    data.length > limit
      ? btoa(
          JSON.stringify({
            userId: data[data.length - 1]!.user_id,
            createdAt: data[data.length - 1]!.created_at,
          })
        )
      : ''

  data = data.slice(0, limit) // trim to limit

  // format previous cursor
  const previous_cursor = prevAccountData
    ? btoa(
        JSON.stringify({
          userId: prevAccountData[prevAccountData.length - 1]?.user_id,
          createdAt: prevAccountData[prevAccountData.length - 1]?.created_at,
        })
      )
    : ''

  return response.status(200).send({
    page: {
      limit: data.length,
      cursor,
      next_cursor,
      previous_cursor,
    },
    data,
  })
}

// getUser
type GetUserReply = {
  [statusCode in keyof typeof getUserSchema.response]: z.infer<
    (typeof getUserSchema.response)[statusCode]
  >
}

export async function getUserErrorHandler(
  error: Error,
  request: FastifyRequest<{
    Params: z.infer<typeof getUserSchema.params>
    Reply: GetUserReply
  }>,
  response: FastifyReply<{
    Reply: GetUserReply
  }>
) {}

export async function getUserNotFoundHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof getUserSchema.params>
    Reply: GetUserReply
  }>,
  response: FastifyReply<{
    Reply: GetUserReply
  }>
) {
  return response.code(404).send({
    error: 'Not found',
    message: 'User does not exist',
  })
}

export async function getUserHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof getUserSchema.params>
    Reply: GetUserReply
  }>,
  response: FastifyReply<{
    Reply: GetUserReply
  }>
) {
  const userData = await request.server.db
    .selectFrom('user_accounts')
    .innerJoin(
      'user_profiles',
      'user_profiles.user_id',
      'user_accounts.user_id'
    )
    .select([
      'user_accounts.user_id',
      'user_accounts.created_at',
      'user_accounts.username',
      'user_profiles.first_name',
      'user_profiles.last_name',
      'user_profiles.avatar_url',
      'user_accounts.created_at',
    ])
    .where('user_accounts.user_id', '=', request.params.id)
    .executeTakeFirst()

  if (!userData) {
    response.status(404)
    return { status: 'User not found' }
  }

  return {
    user_id: userData.user_id,
    username: userData.username,
    full_name: userData.first_name + ' ' + userData.last_name,
    followers_count: 0,
    following_count: 0,
    avatar_url: userData.avatar_url ?? '',
    api_path: `/v1/users/${userData.user_id}/reviews`,
    created_at: userData.created_at,
    followers_path: `/v1/users/${userData.user_id}/followers`,
    following_path: `/v1/users/${userData.user_id}/following`,
    reviews_path: `/v1/users/${userData.user_id}/reviews`,
  }
}

// registerUser
type RegisterUserReply = {
  [statusCode in keyof typeof registerUserSchema.response]: z.infer<
    (typeof registerUserSchema.response)[statusCode]
  >
}

// TODO: implment registerUser error handlers

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: z.infer<typeof registerUserSchema.body>
    Reply: RegisterUserReply
  }>,
  response: FastifyReply<{
    Reply: RegisterUserReply
  }>
) {}

// getFollowersList
type GetFollowersListReply = {
  [statusCode in keyof typeof getFollowersSchema.response]: z.infer<
    (typeof getFollowersSchema.response)[statusCode]
  >
}

// TODO: implment getFollowersList error handlers

export async function getFollowersListHandler(
  request: FastifyRequest<{
    // Body: z.infer<typeof getFollowersSchema.body>
    Reply: GetFollowersListReply
  }>,
  response: FastifyReply<{
    Reply: GetFollowersListReply
  }>
) {}

// getFollowingList
type GetFollowingListReply = {
  [statusCode in keyof typeof getFollowingSchema.response]: z.infer<
    (typeof getFollowingSchema.response)[statusCode]
  >
}

// TODO: implment getFollowingList error handlers

export async function getFollowingListHandler(
  request: FastifyRequest<{
    // Body: z.infer<typeof getFollowingSchema.body>
    Reply: GetFollowingListReply
  }>,
  response: FastifyReply<{
    Reply: GetFollowingListReply
  }>
) {}

// updateUser
type UpdateUserReply = {
  [statusCode in keyof typeof updateUserSchema.response]: z.infer<
    (typeof updateUserSchema.response)[statusCode]
  >
}

// TODO: implment updateUser error handlers

export async function updateUserHandler(
  request: FastifyRequest<{
    // Body: z.infer<typeof updateUserSchema.body>
    Reply: UpdateUserReply
  }>,
  response: FastifyReply<{
    Reply: UpdateUserReply
  }>
) {}
