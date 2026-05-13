import z from 'zod';
import { internalServerErrorSchema } from './snippets/error.schemas.js';

const statusSchema = z.literal(['healthy', 'unhealthy']);

const isHealthySchema = z.object({
  server_status: statusSchema,
  timestamp: z.iso.datetime(),
  total_latency: z.number(),
  uptime: z.number(),
  checks: z.array(
    z.object({
      name: z.string(),
      status: statusSchema,
      latency: z.number(),
      message: z.string().optional(),
    })
  ),
});

export const healthSchema = {
  summary: 'API health test',
  description: '',
  tags: ['health'],
  operationId: 'health',
  response: {
    200: isHealthySchema,
    500: internalServerErrorSchema,
    503: isHealthySchema,
  },
};
