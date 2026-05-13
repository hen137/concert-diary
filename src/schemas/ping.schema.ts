import z from 'zod';
import { internalServerErrorSchema } from './snippets/error.schemas.js';

export const pingSchema = {
  summary: 'API ping test',
  description: 'Confirms API is running and accessible',
  tags: ['health'],
  operationId: 'ping',
  response: {
    200: z.literal('pong'),
    500: internalServerErrorSchema,
  },
};
