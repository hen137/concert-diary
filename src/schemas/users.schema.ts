import { z } from 'zod';
import { reviewSchema } from './reviews.schema.js';
import {
  malformedPaginationSchema,
  paginationQueryStringSchema,
  paginationSchema,
} from './snippets/pagination.schema.js';
import {
  badRequestSchema,
  dataNotFoundSchema,
  internalServerErrorSchema,
  notFoundSchema,
} from './snippets/error.schemas.js';

// NOTE: param field names must match autoload dir names
const paramSchema = z.object({
  userId: z.uuid(),
});

export const malformedUserIdSchema = badRequestSchema.extend({
  message: z.literal('Malformed user ID'),
});

export const userNotFoundSchema = notFoundSchema
  .extend({
    message: z.literal('User does not exist'),
  })
  .meta({
    description: '404 user not found response',
  });

export const userSchema = z.object({
  user_id: z.uuid(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  followers_count: z.int().nonnegative(),
  following_count: z.int().nonnegative(),
  avatar_url: z.union([z.url(), z.literal('')]),
  api_path: z.string(),
  created_at: z.date(),
});

export const userPageSchema = z
  .object({
    page: paginationSchema,
    data: z.array(userSchema),
  })
  .meta({
    description: '200 success response',
  });

export const registerUserSchema = {
  summary: 'Create a user',
  description: 'Creates a new user.',
  tags: ['users'],
  operationId: 'registerUser',
  security: [{ bearerAuth: [] }], // TODO: add scope when supported
  body: z.object({
    username: z.string(),
    email: z.string(), // TODO: use email format
    password_hash: z.hash('sha256'), // TODO: expand on this
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    date_of_birth: z.date(),
  }),
  response: {
    201: z
      .object({
        status: z.string(),
      })
      .meta({
        description: '201 created response',
      }),
    500: internalServerErrorSchema,
  },
};

export const updateUserSchema = {
  summary: 'Update a user',
  description: 'Updates an existing user.',
  tags: ['users'],
  operationId: 'updateUser',
  params: paramSchema,
  response: {
    200: z
      .object({
        // TODO: add fields
      })
      .meta({
        description: '200 success response',
      }),
    400: malformedUserIdSchema,
    404: userNotFoundSchema,
    500: internalServerErrorSchema,
  },
};

export const getUserSchema = {
  summary: 'Get a user',
  description: 'Queries for a specific user.',
  tags: ['users'],
  operationId: 'getUser',
  params: paramSchema,
  response: {
    200: userSchema
      .extend({
        // TODO: enforce path structure
        followers_path: z.string(),
        following_path: z.string(),
        reviews_path: z.string(),
      })
      .meta({ description: '200 success response' }),
    400: malformedUserIdSchema,
    404: userNotFoundSchema,
    500: internalServerErrorSchema,
  },
};

export const getUserReviewsSchema = {
  summary: "Get user's reviews",
  description: "Retrieves a user's reviews",
  tags: ['users', 'reviews', 'paginate'],
  operationId: 'getUserReviews',
  params: paramSchema,
  querystring: paginationQueryStringSchema,
  response: {
    200: z
      .object({
        page: paginationSchema,
        data: z.array(reviewSchema),
      })
      .meta({
        description: '200 success response',
      }),
    400: malformedPaginationSchema,
    404: userNotFoundSchema,
    500: internalServerErrorSchema,
  },
};

export const getUserListSchema = {
  summary: 'Get list of users',
  description: 'list user profiles with pagination',
  tags: ['users', 'paginate'],
  operationId: 'getUserList',
  querystring: paginationQueryStringSchema,
  response: {
    200: userPageSchema,
    400: malformedPaginationSchema,
    404: dataNotFoundSchema,
    500: internalServerErrorSchema,
  },
};

export const getFollowersSchema = {
  summary: 'Get followers',
  description: 'Queries for a list of followers.',
  tags: ['users', 'paginate'],
  operationId: 'getFollowersList',
  params: paramSchema,
  querystring: paginationQueryStringSchema,
  response: {
    200: userPageSchema,
    400: malformedPaginationSchema,
    404: dataNotFoundSchema,
    500: internalServerErrorSchema,
  },
};

export const getFollowingSchema = {
  summary: 'Get following',
  description: 'Queries for a list of following.',
  tags: ['users', 'paginate'],
  operationId: 'getFollowingList',
  params: paramSchema,
  querystring: paginationQueryStringSchema,
  response: {
    200: userPageSchema,
    400: malformedPaginationSchema,
    404: dataNotFoundSchema,
    500: internalServerErrorSchema,
  },
};
