import type {
  IErrorResponse,
  PaginationErrorResponse,
  // RegisterErrorResponse,
  UserErrorResponse,
} from '../types/error_responses.js';

import z from 'zod';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import {
  dataNotFoundSchema,
  internalServerErrorSchema,
} from '../schemas/snippets/error.schemas.js';
import {
  malformedCursorSchema,
  malformedLimitSchema,
} from '../schemas/snippets/pagination.schema.js';
import {
  malformedUserIdSchema,
  userNotFoundSchema,
} from '../schemas/users.schema.js';

// 400 Responses

const malformedUserIdResponse: z.infer<typeof malformedUserIdSchema> = {
  error: 'Bad request',
  message: 'Malformed user ID',
};

const malformedLimitResponse: z.infer<typeof malformedLimitSchema> = {
  error: 'Bad request',
  message: 'Malformed limit',
};

const malformedCursorResponse: z.infer<typeof malformedCursorSchema> = {
  error: 'Bad request',
  message: 'Malformed cursor',
};

// 404 Responses

export const dataNotFoundResponse: z.infer<typeof dataNotFoundSchema> = {
  error: 'Not found',
  message: 'Data does not exist',
};

export const userNotFoundResponse: z.infer<typeof userNotFoundSchema> = {
  error: 'Not found',
  message: 'User does not exist',
};

// 500 Responses

const serverErrorResponse: z.infer<typeof internalServerErrorSchema> = {
  error: 'Internal Server Error',
  message: 'ADD MESSAGE',
};

// Response getters

/**
 * Returns the appropriate error response for pagination-related errors
 * @param error
 * @returns
 */
export function getPaginationErrorResponse(
  error: unknown
): IErrorResponse<PaginationErrorResponse> {
  let code = 500;
  let errorResponse: PaginationErrorResponse = serverErrorResponse;

  if (
    hasZodFastifySchemaValidationErrors(error) &&
    error.validation[0].instancePath === '/limit' // invalid limit
  ) {
    code = 400;
    errorResponse = malformedLimitResponse;
  } else if (
    // error instanceof DOMException ||
    (hasZodFastifySchemaValidationErrors(error) &&
      error.validation[0].instancePath === '/cursor') || // invalid base64 encoding of cursor
    error instanceof SyntaxError || // invalid JSON from decoded cursor
    error instanceof z.ZodError // invalid object members in decoded cursor
  ) {
    code = 400;
    errorResponse = malformedCursorResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for user-related errors
 * @param error
 * @returns
 */
export function getUserErrorResponse(
  error: Error
): IErrorResponse<UserErrorResponse> {
  let code = 500;
  let errorResponse: UserErrorResponse = serverErrorResponse;

  // this shouldnt occur, in theory...
  if (error.message === 'Data integrity error: multiple users with same ID') {
    code = 400;
    errorResponse = malformedUserIdResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for registration-related errors
 * @param error
 * @returns
 */

// export function getRegisterResponse(
//   error: unknown
// ): IErrorResponse<RegisterErrorResponse> {
//   let code = 500;
//   let errorResponse = serverErrorResponse;

//   if (hasZodFastifySchemaValidationErrors(error)) {
//     code = 400;
//     if (error.validation[0].instancePath === '/username')
//       errorResponse = malformedUsernameResponse;
//     else if (error.validation[0].instancePath === '/email')
//       errorResponse = malformedEmailResponse;
//     else if (error.validation[0].instancePath === '/password_hash')
//       errorResponse = malformedPasswordHashResponse;
//     else if (error.validation[0].instancePath === '/first_name')
//       errorResponse = malformedFirstNameResponse;
//     else if (error.validation[0].instancePath === '/last_name')
//       errorResponse = malformedLastNameResponse;
//     else if (error.validation[0].instancePath === '/gender')
//       errorResponse = malformedGenderResponse;
//     else if (error.validation[0].instancePath === '/date_of_birth')
//       errorResponse = malformedDateOfBirthResponse;
//   }

//   return { code, errorResponse };
// }
