import { z } from "zod";
import { paginationSchema } from "./snippets/pagination.schema.js";

const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  full_name: z.string(),
  followers_count: z.int(),
  following_count: z.int(),
  avatar_url: z.string(), // TODO: change to URL type when supported
  api_link: z.string(), // TODO: change to URL type when supported
  created_at: z.string(),
});

export const getUserListSchema = {
  summary: "Get list of users",
  description: "Queries for a list of users.",
  tags: ["users"],
  querystring: z.object({}),
  params: z.object({}),
  headers: z.object({}),
  response: {
    200: z
      .object({
        statusCode: z.int(),
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: "200 success response for the get user list handler",
      }),
    // 500: serverErrorSchema
  },
};

export const getUserSchema = {
  summary: "Get a user",
  description: "Queries for a specific user.",
  tags: ["users"],
  // body: z.object({

  // }),
  querystring: z.object({}),
  params: z.object({
    id: z.string(),
  }),
  headers: z.object({}),
  response: {
    200: userSchema
      .extend({
        statusCode: z.int(),
        followers_url: z.string(), // TODO: change to URL type when supported
        following_url: z.string(), // TODO: change to URL type when supported
        reviews_url: z.string(), // TODO: change to URL type when supported
      })
      .meta({ description: "200 success response for the get user handler" }),
    404: z
      .object({
        statusCode: z.int(),
      })
      .meta({ description: "404 not found response for the get user handler" }),
    // 500: serverErrorSchema
  },
};

export const createUserSchema = {
  summary: "Create a user",
  description: "Creates a new user.",
  tags: ["users"],
  params: z.object({}),
  querystring: z.object({}),
  headers: z.object({}),
  body: z.object({
    username: z.string(),
    email: z.string(),
    password_hash: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    date_of_birth: z.date(),
    avatar_url: z.string(),
  }),
  response: {
    200: z
      .object({
        statusCode: z.int(),
      })
      .meta({
        description: "200 success response for the create user handler",
      }),
    // 500: serverErrorSchema
  },
};

export const getFollowersSchema = {
  summary: "Get followers",
  description: "Queries for a list of followers.",
  tags: ["users"],
  params: z.object({}),
  querystring: z.object({}),
  headers: z.object({}),
  response: {
    200: z
      .object({
        statusCode: z.int(),
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: "200 success response for the get followers handler",
      }),
    // 500: serverErrorSchema
  },
};

export const getFollowingSchema = {
  summary: "Get following",
  description: "Queries for a list of following.",
  tags: ["users"],
  params: z.object({}),
  querystring: z.object({}),
  headers: z.object({}),
  response: {
    200: z
      .object({
        statusCode: z.int(),
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: "200 success response for the get following handler",
      }),
    // 500: serverErrorSchema
  },
};

export const updateUserSchema = {
  summary: "Update a user",
  description: "Updates an existing user.",
  tags: ["users"],
  params: z.object({}),
  querystring: z.object({}),
  headers: z.object({}),
  response: {
    200: z
      .object({
        statusCode: z.int(),
      })
      .meta({
        description: "200 success response for the update user handler",
      }),
    // 500: serverErrorSchema
  },
};

export const deactivateUserSchema = {
  summary: "Deactivate a user",
  description: "Deactivates an existing user.",
  tags: ["users"],
  params: z.object({}),
  querystring: z.object({}),
  headers: z.object({}),
  response: {
    200: z
      .object({
        statusCode: z.int(),
      })
      .meta({
        description: "200 success response for the deactivate user handler",
      }),
    // 500: serverErrorSchema
  },
};
