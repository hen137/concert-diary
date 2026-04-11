import type { Server } from '../../../../index.js'

import { registerUserSchema } from '../../../../schemas/users.schema.js'
import { registerUserHandler } from '../../../../handlers/users.handlers.js'
export default async function userRoutes(server: Server) {
  // server.setErrorHandler()
  // server.setNotFoundHandler()

  server.post('', { schema: registerUserSchema }, registerUserHandler)
}
