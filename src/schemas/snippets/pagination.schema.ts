import { z } from 'zod';
import { badRequestSchema } from './error.schemas.js';

export const userCursorSchema = z.object({
  // camelCase, used internally
  userId: z.uuid(),
  createdAt: z.string().transform((val) => new Date(val)),
});

export const venueCursorSchema = z.object({
  // camelCase, used internally
  venueId: z.uuid(),
  // createdAt: z.string().transform((val) => new Date(val)),
});

export const eventCursorSchema = z.object({
  // camelCase, used internally
  eventId: z.uuid(),
  // createdAt: z.string().transform((val) => new Date(val)),
});

export const seriesCursorSchema = z.object({
  // camelCase, used internally
  seriesId: z.uuid(),
  // createdAt: z.string().transform((val) => new Date(val)),
});

export const artistCursorSchema = z.object({
  // camelCase, used internally
  artistId: z.uuid(),
  // createdAt: z.string().transform((val) => new Date(val)),
});

export const malformedLimitSchema = badRequestSchema.extend({
  message: z.literal('Malformed limit'),
});

export const malformedCursorSchema = badRequestSchema.extend({
  message: z.literal('Malformed cursor'),
});

export const malformedPaginationSchema = z
  .union([malformedCursorSchema, malformedLimitSchema])
  .meta({
    description: '400 malformed query parameter response',
  });

export const paginationQueryStringSchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .positive()
    .default(10)
    .meta({ description: 'Number of items to return per page for pagination' }),
  cursor: z
    .base64()
    .default('')
    .meta({ description: 'Cursor for pagination, encoded as base64 string' }),
});

export const paginationSchema = z.object({
  cursor: z.base64(),
  limit: z.number().min(0).max(100).default(10),
  // first_cursor: z.base64(),
  // last_cursor: z.base64(),
  next_cursor: z.base64(),
  previous_cursor: z.base64(),
});
