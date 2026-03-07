import type { Server } from "../../index.js";

import { testSchema } from "./schemas.js";
import { logger } from '../../utils/logger.utils.js';

export default async function testRoutes(server: Server) {
    // NOTE: conisder registering route hooks
    
    server.get('', { schema: testSchema }, async (request, response) => {
        
        
        return {
            "statusCode": response.statusCode,
        }
    })
}
