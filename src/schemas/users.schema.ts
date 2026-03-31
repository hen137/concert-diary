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
  operationId: "getUserList",
  response: {
    200: z
      .object({
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: "200 success response for the get user list handler",
      }),
  },
};

export const getUserSchema = {
  summary: "Get a user",
  description: "Queries for a specific user.",
  tags: ["users"],
  operationId: "getUser",
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: userSchema
      .extend({
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

export const registerUserSchema = {
  summary: "Create a user",
  description: "Creates a new user.",
  tags: ["users"],
  operationId: "registerUser",
  security: [{ bearerAuth: [] }], // TODO: add scope when supported
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
    201: z
      .object({
        status: z.string(),
      })
      .meta({
        description: "201 created response for the register user handler",
      }),
    400: z
      .object({
        status: z.string(),
      })
      .meta({
        description:
          "400 username is taken or invalid response for the register user handler",
      }),
  },
};

export const getFollowersSchema = {
  summary: "Get followers",
  description: "Queries for a list of followers.",
  tags: ["users"],
  operationId: "getFollowers",
  response: {
    200: z
      .object({
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: "200 success response for the get followers handler",
      }),
  },
};

export const getFollowingSchema = {
  summary: "Get following",
  description: "Queries for a list of following.",
  tags: ["users"],
  operationId: "getFollowing",
  response: {
    200: z
      .object({
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: "200 success response for the get following handler",
      }),
  },
};

export const updateUserSchema = {
  summary: "Update a user",
  description: "Updates an existing user.",
  tags: ["users"],
  operationId: "updateUser",
  response: {
    200: z.object({}).meta({
      description: "200 success response for the update user handler",
    }),
  },
};
