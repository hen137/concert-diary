import type {
  IErrorResponse,
  PaginationErrorResponse,
  RegisterErrorResponse,
  UnauthorizedErrorResponse,
  UserErrorResponse,
  VenueErrorResponse,
  EventErrorResponse,
  SeriesErrorResponse,
  ArtistErrorResponse,
  ServerErrorResponse,
  MalformedCursorResponse,
  MalformedLimitResponse,
  MalformedUserIdResponse,
  UserNotFoundResponse,
  ArtistNotFoundResponse,
  EventNotFoundResponse,
  SeriesNotFoundResponse,
  VenueNotFoundResponse,
  MalformedArtistIdResponse,
  MalformedEventIdResponse,
  MalformedSeriesIdResponse,
  MalformedVenueIdResponse,
  PasswordTooShortResponse,
  UsernameTooShortResponse,
  DataNotFoundResponse,
  LogErrorResponse,
  MalformedLikeIdResponse,
  MalformedReviewIdResponse,
  LikeNotFoundResponse,
  ReviewNotFoundResponse,
} from '../types/error_responses.js';

import z from 'zod';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { UnauthorizedError } from './errors.util.js';

// Response Getter Types

type GetPaginationErrorResponse =
  | PaginationErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetUserErrorResponse =
  | UserErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetRegisterErrorResponse =
  | RegisterErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetVenueErrorResponse =
  | VenueErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetEventErrorResponse =
  | EventErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetSeriesErrorResponse =
  | SeriesErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetArtistErrorResponse =
  | ArtistErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetReviewErrorResponse =
  | MalformedReviewIdResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetLogErrorResponse =
  | LogErrorResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

type GetLikeErrorResponse =
  | MalformedLikeIdResponse
  | UnauthorizedErrorResponse
  | ServerErrorResponse;

// 400 Responses

const badRequest = 'Bad request';

const malformedLimitResponse: MalformedLimitResponse = {
  error: badRequest,
  message: 'Malformed limit',
};

const malformedCursorResponse: MalformedCursorResponse = {
  error: badRequest,
  message: 'Malformed cursor',
};

const malformedUserIdResponse: MalformedUserIdResponse = {
  error: badRequest,
  message: 'Malformed user ID',
};

const malformedVenueIdResponse: MalformedVenueIdResponse = {
  error: badRequest,
  message: 'Malformed venue ID',
};

const malformedEventIdResponse: MalformedEventIdResponse = {
  error: badRequest,
  message: 'Malformed event ID',
};

const malformedSeriesIdResponse: MalformedSeriesIdResponse = {
  error: badRequest,
  message: 'Malformed series ID',
};

const malformedArtistIdResponse: MalformedArtistIdResponse = {
  error: badRequest,
  message: 'Malformed artist ID',
};

const malformedReviewIdResponse: MalformedReviewIdResponse = {
  error: badRequest,
  message: 'Malformed review ID',
};

const malformedLikeIdResponse: MalformedLikeIdResponse = {
  error: badRequest,
  message: 'Malformed like ID',
};

const usernameTooShortResponse: UsernameTooShortResponse = {
  error: badRequest,
  message: 'Username must be at least 3 characters long',
};

const passwordTooShortResponse: PasswordTooShortResponse = {
  error: badRequest,
  message: 'Password must be at least 8 characters long',
};

// 401 Responses

const unauthorizedResponse: UnauthorizedErrorResponse = {
  error: 'Unauthorized',
  message: 'Unauthorized Request',
};

// 403 Responses

// TODO: add 403 response support

// 404 Responses

const notFound = 'Not found';

const dataNotFoundResponse: DataNotFoundResponse = {
  error: notFound,
  message: 'Data does not exist',
};

const userNotFoundResponse: UserNotFoundResponse = {
  error: notFound,
  message: 'User does not exist',
};

const venueNotFoundResponse: VenueNotFoundResponse = {
  error: notFound,
  message: 'Venue does not exist',
};

const eventNotFoundResponse: EventNotFoundResponse = {
  error: notFound,
  message: 'Event does not exist',
};

const seriesNotFoundResponse: SeriesNotFoundResponse = {
  error: notFound,
  message: 'Series does not exist',
};

const artistNotFoundResponse: ArtistNotFoundResponse = {
  error: notFound,
  message: 'Artist does not exist',
};

const reviewNotFoundResponse: ReviewNotFoundResponse = {
  error: notFound,
  message: 'Review does not exist',
};

const likeNotFoundResponse: LikeNotFoundResponse = {
  error: notFound,
  message: 'Like does not exist',
};

// 500 Responses

const serverErrorResponse: ServerErrorResponse = {
  error: 'Internal Server Error',
  message: 'ADD MESSAGE',
};

// Response getters

/**
 * Returns the appropriate error response for unauthorized errors
 * @param error
 * @returns
 */
function getUnauthorizedResponse(): IErrorResponse<UnauthorizedErrorResponse> {
  // error: UnauthorizedError
  // TODO: add fine grained unauthorized responses
  return {
    code: 401,
    errorResponse: unauthorizedResponse,
  };
}

/**
 * Returns the appropriate error response for pagination-related errors
 * @param error
 * @returns
 */
export function getPaginationErrorResponse(
  error: unknown
): IErrorResponse<GetPaginationErrorResponse> {
  let code = 500;
  let errorResponse: GetPaginationErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (
    hasZodFastifySchemaValidationErrors(error) &&
    error.validation[0].instancePath === '/limit' // invalid limit
  ) {
    code = 400;
    errorResponse = malformedLimitResponse;
  } else if (
    // error instanceof DOMException || // handled by route validation zod schema
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
): IErrorResponse<GetUserErrorResponse> {
  let code = 500;
  let errorResponse: GetUserErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  // this shouldnt occur, in theory...
  if (error.message === 'Data integrity error: multiple users with same ID') {
    code = 400;
    errorResponse = malformedUserIdResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for user registration-related errors
 * @param error
 * @returns
 */
export function getRegisterErrorResponse(
  error: Error
): IErrorResponse<GetRegisterErrorResponse> {
  let code = 500;
  let errorResponse: GetRegisterErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (hasZodFastifySchemaValidationErrors(error)) {
    code = 400;

    let invalid_type = false;
    for (const validationError of error.validation) {
      if (validationError.keyword === 'invalid_type') {
        invalid_type = true;
        break;
      }
    }

    if (invalid_type) {
      const missing = [];
      for (const validationError of error.validation) {
        if (validationError.keyword === 'invalid_type') {
          if (validationError.instancePath === '/username')
            missing.push('username');
          if (validationError.instancePath === '/email') missing.push('email');
          if (validationError.instancePath === '/password')
            missing.push('password');
        }
      }

      errorResponse = {
        error: 'Bad request',
        message: `Body is missing required properties: ${missing.join(', ')}`,
      };
    } else {
      if (error.validation[0].keyword === 'too_small') {
        if (error.validation[0].instancePath === '/username') {
          errorResponse = usernameTooShortResponse;
        } else if (error.validation[0].instancePath === '/password') {
          errorResponse = passwordTooShortResponse;
        }
      }
    }
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for venue-related errors
 * @param error
 * @returns
 */
export function getVenueErrorResponse(
  error: Error
): IErrorResponse<GetVenueErrorResponse> {
  let code = 500;
  let errorResponse: GetVenueErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (error.message === 'Data integrity error: multiple venues with same ID') {
    code = 400;
    errorResponse = malformedVenueIdResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for event-related errors
 * @param error
 * @returns
 */
export function getEventErrorResponse(
  error: Error
): IErrorResponse<GetEventErrorResponse> {
  let code = 500;
  let errorResponse: GetEventErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (error.message === 'Data integrity error: multiple events with same ID') {
    code = 400;
    errorResponse = malformedEventIdResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for series-related errors
 * @param error
 * @returns
 */
export function getSeriesErrorResponse(
  error: Error
): IErrorResponse<GetSeriesErrorResponse> {
  let code = 500;
  let errorResponse: GetSeriesErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (error.message === 'Data integrity error: multiple series with same ID') {
    code = 400;
    errorResponse = malformedSeriesIdResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for artist-related errors
 * @param error
 * @returns
 */
export function getArtistErrorResponse(
  error: Error
): IErrorResponse<GetArtistErrorResponse> {
  let code = 500;
  let errorResponse: GetArtistErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (error.message === 'Data integrity error: multiple artists with same ID') {
    code = 400;
    errorResponse = malformedArtistIdResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for review-related errors
 * @param error
 * @returns
 */
export function getReviewErrorResponse(
  error: Error
): IErrorResponse<GetReviewErrorResponse> {
  let code = 500;
  let errorResponse: GetReviewErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (error.message === 'Data integrity error: multiple reviews with same ID') {
    code = 400;
    errorResponse = malformedReviewIdResponse;
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for review logging-related errors
 * @param error
 * @returns
 */
export function getLogErrorResponse(
  error: Error
): IErrorResponse<GetLogErrorResponse> {
  let code = 500;
  let errorResponse: GetLogErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (hasZodFastifySchemaValidationErrors(error)) {
    code = 400;

    const missing = [];
    for (const validationError of error.validation) {
      if (validationError.keyword === 'invalid_type') {
        if (validationError.instancePath === '/rating') missing.push('rating');
        if (validationError.instancePath === '/review_txt')
          missing.push('review_txt');
      }
    }

    errorResponse = {
      error: 'Bad request',
      message: `Body is missing required properties: ${missing.join(', ')}`,
    };
  }

  return { code, errorResponse };
}

/**
 * Returns the appropriate error response for like-related errors
 * @param error
 * @returns
 */
export function getLikeErrorResponse(
  error: Error
): IErrorResponse<GetLikeErrorResponse> {
  let code = 500;
  let errorResponse: GetLikeErrorResponse = serverErrorResponse;

  if (error instanceof UnauthorizedError) return getUnauthorizedResponse();

  if (error.message === 'Data integrity error: multiple likes with same ID') {
    code = 400;
    errorResponse = malformedLikeIdResponse;
  }

  return { code, errorResponse };
}

// Not Found Response getters

export function getDataNotFoundResponse(): IErrorResponse<DataNotFoundResponse> {
  return {
    code: 404,
    errorResponse: dataNotFoundResponse,
  };
}

export function getUserNotFoundResponse(): IErrorResponse<UserNotFoundResponse> {
  return {
    code: 404,
    errorResponse: userNotFoundResponse,
  };
}

export function getVenueNotFoundResponse(): IErrorResponse<VenueNotFoundResponse> {
  return {
    code: 404,
    errorResponse: venueNotFoundResponse,
  };
}

export function getEventNotFoundResponse(): IErrorResponse<EventNotFoundResponse> {
  return {
    code: 404,
    errorResponse: eventNotFoundResponse,
  };
}

export function getSeriesNotFoundResponse(): IErrorResponse<SeriesNotFoundResponse> {
  return {
    code: 404,
    errorResponse: seriesNotFoundResponse,
  };
}

export function getArtistNotFoundResponse(): IErrorResponse<ArtistNotFoundResponse> {
  return {
    code: 404,
    errorResponse: artistNotFoundResponse,
  };
}

export function getReviewNotFoundResponse(): IErrorResponse<ReviewNotFoundResponse> {
  return {
    code: 404,
    errorResponse: reviewNotFoundResponse,
  };
}

export function getLikeNotFoundResponse(): IErrorResponse<LikeNotFoundResponse> {
  return {
    code: 404,
    errorResponse: likeNotFoundResponse,
  };
}
