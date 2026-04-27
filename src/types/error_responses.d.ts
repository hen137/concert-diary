import type { internalServerErrorSchema } from '../schemas/snippets/error.schemas.js';
import type {
  malformedCursorSchema,
  malformedLimitSchema,
} from '../schemas/snippets/pagination.schema.js';
import type { malformedUserIdSchema } from '../schemas/users.schema.js';

import z from 'zod';

export interface IErrorResponse<ErrorResponse> {
  code: number;
  errorResponse: ErrorResponse;
}

export type PaginationErrorResponse =
  | z.infer<typeof malformedCursorSchema>
  | z.infer<typeof malformedLimitSchema>
  | z.infer<typeof internalServerErrorSchema>;

export type UserErrorResponse =
  | z.infer<typeof malformedUserIdSchema>
  | z.infer<typeof internalServerErrorSchema>;

export type RegisterErrorResponse =
  // z.infer<typeof >
  z.infer<typeof internalServerErrorSchema>;

export type EventErrorResponse = z.infer<typeof internalServerErrorSchema>;
