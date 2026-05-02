import type {
  internalServerErrorSchema,
  dataNotFoundSchema,
  unauthorizedErrorSchema,
} from '../schemas/snippets/error.schemas.js';
import type {
  malformedCursorSchema,
  malformedLimitSchema,
} from '../schemas/snippets/pagination.schema.js';
import type {
  malformedUserIdSchema,
  missingRegisterBodyPropertiesSchema,
  usernameTooShortSchema,
  passwordTooShortSchema,
  userNotFoundSchema,
} from '../schemas/users.schema.js';
import type {
  malformedVenueIdSchema,
  venueNotFoundSchema,
} from '../schemas/venues.schema.js';
import type {
  malformedEventIdSchema,
  eventNotFoundSchema,
} from '../schemas/events.schema.js';
import type {
  malformedSeriesIdSchema,
  seriesNotFoundSchema,
} from '../schemas/series.schema.js';
import type {
  malformedArtistIdSchema,
  artistNotFoundSchema,
} from '../schemas/artists.schema.js';
import type {
  malformedReviewIdSchema,
  malformedLikeIdSchema,
  missingLogBodyPropertiesSchema,
  reviewNotFoundSchema,
  likeNotFoundSchema,
} from '../schemas/reviews.schema.ts';

import z from 'zod';

export interface IErrorResponse<ErrorResponse> {
  code: number;
  errorResponse: ErrorResponse;
}

// Server error response

export type ServerErrorResponse = z.infer<typeof internalServerErrorSchema>;

// Authentication-related error responses

export type UnauthorizedErrorResponse = z.infer<typeof unauthorizedErrorSchema>;

// Pagination-related error responses

export type MalformedLimitResponse = z.infer<typeof malformedLimitSchema>;

export type MalformedCursorResponse = z.infer<typeof malformedCursorSchema>;

export type PaginationErrorResponse =
  | MalformedCursorResponse
  | MalformedLimitResponse;

// Not found responses

export type DataNotFoundResponse = z.infer<typeof dataNotFoundSchema>;

// User-related error responses

export type MalformedUserIdResponse = z.infer<typeof malformedUserIdSchema>;

export type UserErrorResponse = MalformedUserIdResponse;

export type MissingRegisterBodyPropertiesResponse = z.infer<
  typeof missingRegisterBodyPropertiesSchema
>;

export type UsernameTooShortResponse = z.infer<typeof usernameTooShortSchema>;

export type PasswordTooShortResponse = z.infer<typeof passwordTooShortSchema>;

export type RegisterErrorResponse =
  | MissingRegisterBodyPropertiesResponse
  | UsernameTooShortResponse
  | PasswordTooShortResponse;

export type UserNotFoundResponse = z.infer<typeof userNotFoundSchema>;

// Venue-related error responses

export type MalformedVenueIdResponse = z.infer<typeof malformedVenueIdSchema>;

export type VenueErrorResponse = MalformedVenueIdResponse;

export type VenueNotFoundResponse = z.infer<typeof venueNotFoundSchema>;

// Event-related error responses

export type MalformedEventIdResponse = z.infer<typeof malformedEventIdSchema>;

export type EventErrorResponse = MalformedEventIdResponse;

export type EventNotFoundResponse = z.infer<typeof eventNotFoundSchema>;

// Series-related error responses

export type MalformedSeriesIdResponse = z.infer<typeof malformedSeriesIdSchema>;

export type SeriesErrorResponse = MalformedSeriesIdResponse;

export type SeriesNotFoundResponse = z.infer<typeof seriesNotFoundSchema>;

// Artist-related error responses

export type MalformedArtistIdResponse = z.infer<typeof malformedArtistIdSchema>;

export type ArtistErrorResponse = MalformedArtistIdResponse;

export type ArtistNotFoundResponse = z.infer<typeof artistNotFoundSchema>;

// Review-related error responses

export type MalformedReviewIdResponse = z.infer<typeof malformedReviewIdSchema>;

export type MalformedLikeIdResponse = z.infer<typeof malformedLikeIdSchema>;

export type MissingLogBodyPropertiesResponse = z.infer<
  typeof missingLogBodyPropertiesSchema
>;

export type LogErrorResponse = MissingLogBodyPropertiesResponse;

export type ReviewNotFoundResponse = z.infer<typeof reviewNotFoundSchema>;

export type LikeNotFoundResponse = z.infer<typeof likeNotFoundSchema>;
