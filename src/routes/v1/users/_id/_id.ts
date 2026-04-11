import type { Server } from '../../../../index.js'

import {
  getUserSchema,
  updateUserSchema,
} from '../../../../schemas/users.schema.js'
import {
  getUserHandler,
  registerUserHandler,
} from '../../../../handlers/users.handlers.js'

export default async function (server: Server) {
  // server.setErrorHandler()
  // server.setNotFoundHandler()

  server.get('', { schema: getUserSchema }, getUserHandler)
  server.put('', { schema: updateUserSchema }, registerUserHandler)
}
