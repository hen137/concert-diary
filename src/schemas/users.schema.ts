import { z } from 'zod'
import {
  paginationQueryString,
  paginationSchema,
} from './snippets/pagination.schema.js'
import {
  badRequestSchema,
  internalServerErrorSchema,
  notFoundSchema,
} from './snippets/error.schemas.js'

const userSchema = z.object({
  user_id: z.uuid(),
  username: z.string(),
  full_name: z.string(), // CONSIDER: split into first_name and last_name
  followers_count: z.int(),
  following_count: z.int(),
  avatar_url: z.string(),
  api_path: z.string(),
  created_at: z.date(),
})

export const getUserListSchema = {
  summary: 'Get list of users',
  description: 'list user profiles with pagination',
  tags: ['users'],
  operationId: 'getUserList',
  querystring: paginationQueryString,
  response: {
    200: z
      .object({
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: '200 success response',
      }),
    400: badRequestSchema.extend({
      message: z.literal('Malformed cursor'),
    }),
    404: notFoundSchema.extend({
      message: z.literal('User does not exist').default,
    }),
    500: internalServerErrorSchema,
  },
}

export const getUserSchema = {
  summary: 'Get a user',
  description: 'Queries for a specific user.',
  tags: ['users'],
  operationId: 'getUser',
  params: z.object({
    id: z.uuid(),
  }),
  response: {
    200: userSchema
      .extend({
        // TODO: enforce path structure
        followers_path: z.string(),
        following_path: z.string(),
        reviews_path: z.string(),
      })
      .meta({ description: '200 success response for the get user handler' }),
    404: notFoundSchema.extend({
      message: z.literal('User does not exist').default,
    }),
    // 500: serverErrorSchema
  },
}

export const registerUserSchema = {
  summary: 'Create a user',
  description: 'Creates a new user.',
  tags: ['users'],
  operationId: 'registerUser',
  security: [{ bearerAuth: [] }], // TODO: add scope when supported
  body: z.object({
    username: z.string(),
    email: z.string(),
    password_hash: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    date_of_birth: z.date(),
    avatar_url: z.string().optional(),
  }),
  response: {
    201: z
      .object({
        status: z.string(),
      })
      .meta({
        description: '201 created response for the register user handler',
      }),
    400: z
      .object({
        status: z.string(),
      })
      .meta({
        description:
          '400 username is taken or invalid response for the register user handler',
      }),
  },
}

export const getFollowersSchema = {
  summary: 'Get followers',
  description: 'Queries for a list of followers.',
  tags: ['users'],
  operationId: 'getFollowersList',
  response: {
    200: z
      .object({
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: '200 success response for the get followers handler',
      }),
  },
}

export const getFollowingSchema = {
  summary: 'Get following',
  description: 'Queries for a list of following.',
  tags: ['users'],
  operationId: 'getFollowingList',
  response: {
    200: z
      .object({
        page: paginationSchema,
        data: z.array(userSchema),
      })
      .meta({
        description: '200 success response for the get following handler',
      }),
  },
}

export const updateUserSchema = {
  summary: 'Update a user',
  description: 'Updates an existing user.',
  tags: ['users'],
  operationId: 'updateUser',
  response: {
    200: z
      .object({
        status: z.string(),
      })
      .meta({
        description: '200 success response for the update user handler',
      }),
  },
}
