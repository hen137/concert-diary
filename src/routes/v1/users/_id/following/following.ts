import type { Server } from '../../../../../index.js'

import { getFollowingListHandler } from '../../../../../handlers/users.handlers.js'
import { getFollowingSchema } from '../../../../../schemas/users.schema.js'

export default async function (server: Server) {
  // server.setErrorHandler()
  // server.setNotFoundHandler()

  server.get('', { schema: getFollowingSchema }, getFollowingListHandler)
}
