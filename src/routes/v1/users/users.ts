import type { Server } from '../../../index.js'

import { getUserListSchema } from '../../../schemas/users.schema.js'
import {
  getUserListErrorHandler,
  getUserListHandler,
  getUserListNotFoundHandler,
} from '../../../handlers/users.handlers.js'

export default async function usersRoutes(server: Server) {
  server.setErrorHandler(getUserListErrorHandler)
  server.setNotFoundHandler(getUserListNotFoundHandler)

  server.get('', { schema: getUserListSchema }, getUserListHandler)

  // server.setErrorHandler((error, request, response) => {
  //   logger.error(error)
  //   if (
  //     error instanceof DOMException || // invalid base64 encoding of cursor
  //     error instanceof SyntaxError || // invalid JSON from decoded cursor
  //     error instanceof z.ZodError // invalid object members in decoded cursor
  //   ) {
  //     response.code(400)
  //     return {
  //       error: 'Bad request',
  //       message: 'Malformed cursor',
  //     }
  //   }
  //   // else if (error instanceof ERROR) {
  //   //   response.code(number)
  //   //   return {}
  //   // }
  //   else {
  //     response.code(500)
  //     return {
  //       error: 'Internal Server Error',
  //     }
  //   }
  // })

  // server.setNotFoundHandler((request, response) => {
  //   response.code(404)
  //   return {
  //     error: 'Not found',
  //     message: 'User does not exist',
  //   }
  // })

  //   server.get('', { schema: getUserListSchema }, async (request, response) => {
  //     // CONSIDER: add support for offset/page pagination
  //     // TODO: implement sorting and filtering
  //     // TODO: add support for first and last page cursors

  //     // extract query params
  //     const { cursor } = request.query
  //     const limit = Math.min(Math.max(request.query.limit, 1), 100)

  //     // data variables
  //     let accountData: {
  //       user_id: string
  //       created_at: Date
  //       username: string
  //       avatar_url: string | null
  //       first_name: string
  //       last_name: string
  //     }[]
  //     let prevAccountData: { user_id: string; created_at: Date }[] = []

  //     // build query
  //     const query = server.db
  //       .selectFrom('user_accounts')
  //       .innerJoin(
  //         'user_profiles',
  //         'user_accounts.user_id',
  //         'user_profiles.user_id'
  //       )
  //       .select([
  //         'user_accounts.user_id',
  //         'user_accounts.created_at',
  //         'user_accounts.username',
  //         'user_profiles.first_name',
  //         'user_profiles.last_name',
  //         'user_profiles.avatar_url',
  //       ])
  //       .orderBy('user_accounts.created_at', 'desc')
  //       .orderBy('user_accounts.user_id', 'desc')
  //       .limit(limit + 1)

  //     if (cursor) {
  //       // decode cursor
  //       const cursorDecoded = JSON.parse(atob(cursor))

  //       // validate cursor contents
  //       const { userId, createdAt } = cursorSchema.parse(cursorDecoded)

  //       // OPTIMIZE: retireve this cursor and previous cursor in a single query
  //       // query data within cursor window
  //       accountData = await query
  //         .where('user_accounts.created_at', '<', createdAt)
  //         .where('user_accounts.user_id', '<', userId)
  //         .execute()

  //       //  TODO: validate userId exists
  //       // validate existance of supplied userId
  //       // logger.debug(accountData.length)
  //       // if (!accountData.length) {
  //       //   return response.callNotFound()
  //       // }

  //       // FIX: see optimize above
  //       prevAccountData = await server.db
  //         .selectFrom('user_accounts')
  //         .select(['user_id', 'created_at'])
  //         .where('created_at', '>', createdAt)
  //         .where('user_id', '>', userId)
  //         .orderBy('created_at', 'asc')
  //         .orderBy('user_id', 'asc')
  //         .limit(limit)
  //         .execute()
  //     } else {
  //       accountData = await query.execute()
  //     }

  //     // format data
  //     let data = []
  //     for (const account of accountData) {
  //       data.push({
  //         user_id: account.user_id,
  //         username: account.username,
  //         full_name: `${account.first_name} ${account.last_name}`,
  //         // TODO: calculate followers/following count
  //         followers_count: 0,
  //         following_count: 0,
  //         avatar_url: account.avatar_url ?? '',
  //         api_path: `${server.prefix}/${account.user_id}`,
  //         created_at: account.created_at,
  //       })
  //     }

  //     // format next cursor
  //     const next_cursor =
  //       data.length > limit
  //         ? btoa(
  //             JSON.stringify({
  //               userId: data[data.length - 1]!.user_id,
  //               createdAt: data[data.length - 1]!.created_at,
  //             })
  //           )
  //         : ''

  //     data = data.slice(0, limit) // trim to limit

  //     // format previous cursor
  //     const previous_cursor = prevAccountData
  //       ? btoa(
  //           JSON.stringify({
  //             userId: prevAccountData[prevAccountData.length - 1]?.user_id,
  //             createdAt: prevAccountData[prevAccountData.length - 1]?.created_at,
  //           })
  //         )
  //       : ''

  //     return {
  //       page: {
  //         limit: data.length,
  //         cursor,
  //         next_cursor,
  //         previous_cursor,
  //       },
  //       data,
  //     }
  //   })
}
