import { z } from "zod"

export const testSchema = {
    summary: 'Template Schema',
    description: 'Testbed for API schema definitions.',
    tags: ['tests'],
    params: z.object({

    }),
    querystring: z.object({
        // flag: z.stringbool()
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            "statusCode": z.int()
        }).meta({ description: "200 success response for the test handler" }),
        201: z.object({

        }).meta({ description: "201 created response for the test handler" }),
        202: z.object({

        }).meta({ description: "202 accepted response for the test handler" }),
        204: z.object({

        }).meta({ description: "204 no content response for the test handler" }),
        400: z.object({

        }).meta({ description: "400 bad request response for the test handler" }),
        401: z.object({

        }).meta({ description: "401 unauthorized response for the test handler" }),
        404: z.object({

        }).meta({ description: "404 not found response for the test handler" }),
        409: z.object({

        }).meta({ description: "409 conflict response for the test handler" }),
        422: z.object({

        }).meta({ description: "422 unprocessable entity response for the test handler" }),
        500: z.object({
            "statusCode": z.int(),
            "code": z.string(),
            "error": z.string(),
            "message": z.string()
        }).meta({ description: "500 error response for the test handler" })
    }
}