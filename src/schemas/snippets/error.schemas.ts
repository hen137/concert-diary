import { z } from 'zod';

// 400 Schemas

export const badRequestSchema = z
  .strictObject({
    error: z.literal('Bad request'),
    message: z.literal('ADD MESSAGE'), // TODO: add generic message
  })
  .meta({ description: '400 bad request response' });

// 401 Schemas

export const unauthorizedErrorSchema = z
  .object({
    error: z.literal('Unauthorized'),
    message: z.literal('Unauthorized Request'),
  })
  .meta({ description: '401 unauthorized response' });

// 404 Schemas

export const notFoundSchema = z
  .object({
    error: z.literal('Not found'),
    message: z.literal('Resource does not exist'),
  })
  .meta({ description: '404 not found response' });

export const dataNotFoundSchema = notFoundSchema.extend({
  message: z.literal('Data does not exist'),
});

// 500 Schemas

export const internalServerErrorSchema = z
  .object({
    error: z.literal('Internal Server Error'),
    message: z.literal('ADD MESSAGE'), // TODO: add generic message
  })
  .meta({ description: '500 internal server error response' });
