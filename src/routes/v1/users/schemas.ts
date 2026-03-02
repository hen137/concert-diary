import { z } from "zod"

export const getUserListSchema = {
    summary: 'Get list of users',
    description: 'Queries for a list of users.',
    tags: ['users'],
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
    summary: 'Get a user',
    description: 'Queries for a specific user.',
    tags: ['users'],
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
    summary: 'Create a user',
    description: 'Creates a new user.',
    tags: ['users'],
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
    summary: 'Get followers',
    description: 'Queries for a list of followers.',
    tags: ['users'],
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
    summary: 'Get following',
    description: 'Queries for a list of following.',
    tags: ['users'],
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
    summary: 'Update a user',
    description: 'Updates an existing user.',
    tags: ['users'],
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
    summary: 'Deactivate a user',
    description: 'Deactivates an existing user.',
    tags: ['users'],
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