import { z } from "zod"

export const testSchema = {
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
        }),
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

export const getUserListSchema = {
    querystring: z.object({
        flag: z.stringbool(),
        test: z.string()
    }),
    params: z.object({
        // id: z.string()
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            "statusCode": z.int(),
            page: z.object({
                cursor: z.string(),
                page_size: z.number(),
                first_cursor: z.string(),
                last_cursor: z.string(),
                next_cursor: z.string(),
                previous_cursor: z.string(),
            }),
            data: z.array(z.object({

            })),
        })
    }
}

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
            "statusCode": z.int(),
            "id": z.number(),
            "name": z.string(), // NOTE: consider including username 
            "profile_url": z.string(), // TODO: change to URL type when supported
            "avatar_url": z.string(), // TODO: change to URL type when supported
            "followers": z.int(),
            "following": z.int(),
            "followers_url": z.string(), // TODO: change to URL type when supported
            "following_url": z.string(), // TODO: change to URL type when supported
            "reviews_url": z.string(), // TODO: change to URL type when supported
        }),
    }
}

export const createUserSchema = {
    params: z.object({

    }),
    querystring: z.object({
        flag: z.stringbool()
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            "statusCode": z.int(),
        }),
        500: z.object({
            "statusCode": z.int(),
            "code": z.string(),
            "error": z.string(),
            "message": z.string()
        })
    }
}

export const getFollowersSchema = {
    params: z.object({

    }),
    querystring: z.object({
        
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            "statusCode": z.int(),
        }),
        500: z.object({
            "statusCode": z.int(),
            "code": z.string(),
            "error": z.string(),
            "message": z.string()
        })
    }
}

export const getFollowingSchema = {
    params: z.object({

    }),
    querystring: z.object({
        
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            "statusCode": z.int(),
        }),
        500: z.object({
            "statusCode": z.int(),
            "code": z.string(),
            "error": z.string(),
            "message": z.string()
        })
    }
}

export const updateUserSchema = {
    params: z.object({

    }),
    querystring: z.object({
        
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            "statusCode": z.int(),
        }),
        500: z.object({
            "statusCode": z.int(),
            "code": z.string(),
            "error": z.string(),
            "message": z.string()
        })
    }
}

export const deactivateUserSchema = {
    params: z.object({

    }),
    querystring: z.object({
        
    }),
    headers: z.object({

    }),
    response: {
        200: z.object({
            "statusCode": z.int(),
        }),
        500: z.object({
            "statusCode": z.int(),
            "code": z.string(),
            "error": z.string(),
            "message": z.string()
        })
    }
}