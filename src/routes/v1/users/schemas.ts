import { z } from "zod"

export const getUserSchema = {
    // body: z.object({

    // }),
    querystring: z.object({

    }),
    params: z.object({
        // id: z.string()
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            accounts: z.array(z.object({
                id: z.string(),
                email: z.string(),
                created_at: z.string(),
                updated_at: z.string(),
            })),
            profiles: z.array(z.object({
                id: z.string(),
                user_id: z.string(),
                created_at: z.string(),
                updated_at: z.string(),
            }))
        }), 
    }
}