import { z } from "zod"

export const testSchema = {
    summary: 'Template Schema',
    description: 'Testbed for API schema definitions.',
    tags: ['tests'],
    // params: z.object({

    // }),
    querystring: z.object({
        flag: z.stringbool()
    }),
    // headers: z.object({

    // }),
    response: {
        200: z.object({
            foo: z.string()
        }).meta({ description: "200 success response for the test handler" }),
        201: z.object({
            test: z.string()
        }),
        500: z.object({
            "statusCode": z.int(),
            "code": z.string(),
            "error": z.string(),
            "message": z.string()
        })
    }
}