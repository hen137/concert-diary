import { z } from 'zod'

// 400
export const badRequestSchema = z
  .object({
    error: z.literal('Bad request'),
    message: z.string(), // CONSIDER: setting a basic literal
  })
  .meta({ description: '400 bad request response' })

// 404
export const notFoundSchema = z
  .object({
    error: z.literal('Not found'),
    message: z.literal('Resource does not exist'),
  })
  .meta({ description: '404 not found response' })

// 500
export const internalServerErrorSchema = z
  .object({
    error: z.literal('Internal Server Error'),
    message: z.string(), // CONSIDER: setting a basic literal
  })
  .meta({ description: '500 internal server error response' })
