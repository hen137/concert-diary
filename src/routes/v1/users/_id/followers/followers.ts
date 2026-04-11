import type { Server } from '../../../../../index.js'

import { getFollowersListHandler } from '../../../../../handlers/users.handlers.js'
import { getFollowersSchema } from '../../../../../schemas/users.schema.js'

export default async function (server: Server) {
  // server.setErrorHandler()
  // server.setNotFoundHandler()

  server.get('', { schema: getFollowersSchema }, getFollowersListHandler)
}
