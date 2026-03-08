import { z } from "zod"
import { userSchema, paginationSchema, serverErrorSchema } from "../schemas/snippets.schema.js";

export const getUserListSchema = {
    summary: 'Get list of users',
    description: 'Queries for a list of users.',
    tags: ['users'],
    querystring: z.object({

    }),
    params: z.object({
        
    }),
    headers: z.object({
        
    }),
    response: {
        200: z.object({
            "statusCode": z.int(),
            "page": paginationSchema,
            "data": z.array(userSchema),
        }).meta({ description: "200 success response for the get user list handler" }),
        500: serverErrorSchema
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
        "id": z.string()
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
        }).meta({ description: "200 success response for the get user handler" }),
        500: serverErrorSchema
    }
}

export const createUserSchema = {
    summary: 'Create a user',
    description: 'Creates a new user.',
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
        }).meta({ description: "200 success response for the create user handler" }),
        500: serverErrorSchema
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
            "page": paginationSchema,
            "data": z.array(userSchema),
        }).meta({ description: "200 success response for the get followers handler" }),
        500: serverErrorSchema
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
            "page": paginationSchema,
            "data": z.array(userSchema),
        }).meta({ description: "200 success response for the get following handler" }),
        500: serverErrorSchema
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
        }).meta({ description: "200 success response for the update user handler" }),
        500: serverErrorSchema
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
        }).meta({ description: "200 success response for the deactivate user handler" }),
        500: serverErrorSchema
    }
}