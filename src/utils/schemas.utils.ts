import { z } from "zod";

export const userSchema = z.object({
    "id": z.number(),
    "name": z.string(), // NOTE: consider including username 
    "profile_url": z.string(), // TODO: change to URL type when supported
    "avatar_url": z.string(), // TODO: change to URL type when supported
    "api_link": z.string(), // TODO: change to URL type when supported
})

export const paginationSchema = z.object({
    "cursor": z.string(),
    "page_size": z.number(),
    "first_cursor": z.string(),
    "last_cursor": z.string(),
    "next_cursor": z.string(),
    "previous_cursor": z.string(),
})

export const serverErrorSchema = z.object({
    "statusCode": z.int(),
    "code": z.string(),
    "error": z.string(),
    "message": z.string()
}).meta({ description: "500 error response schema" })