import type {
  IArtistCursor,
  IArtistData,
  IEventCursor,
  IEventData,
  ISeriesCursor,
  ISeriesData,
  IUserCursor,
  IUserData,
  IVenueCursor,
  IVenueData,
} from '../types/query_data.js';

import z from 'zod';
import { userPageSchema } from '../schemas/users.schema.js';
import { venuePageSchema } from '../schemas/venues.schema.js';
import { eventPageSchema } from '../schemas/events.schema.js';
import { seriesPageSchema } from '../schemas/series.schema.js';
import { artistPageSchema } from '../schemas/artists.schema.js';

// Cursor & Limit validator

type ValidCursor<Schema extends z.ZodObject> = '' | z.output<Schema>;

interface IValidCursorLimit<Schema extends z.ZodObject> {
  cursor: ValidCursor<Schema>;
  limit: number;
}

const MIN_LIMIT = 1;
const MAX_LIMIT = 100;

/**
 * Returns an object containing the decoded and validated cursor and limit
 * @param encodedCursor
 * @param limit
 * @param cursorSchema
 * @returns
 */
export function validateCursorLimit<Schema extends z.ZodObject>(
  encodedCursor: string,
  limit: number,
  cursorSchema: Schema
): IValidCursorLimit<Schema> {
  let cursor: ValidCursor<Schema> = '';
  limit = Math.min(Math.max(limit, MIN_LIMIT), MAX_LIMIT); // ensure limit lies in [1,100]

  if (encodedCursor) {
    const decodedCursor = JSON.parse(atob(encodedCursor)); // decode cursor
    cursor = cursorSchema.parse(decodedCursor); // validate cursor contents
  }

  return { cursor, limit };
}

// Payload formatters

/**
 *
 * @param cursor
 * @param limit
 * @param accountData
 * @param prevAccountData
 * @returns
 */
export function formatUsersPayload(
  cursor: '' | { userId: string; createdAt: Date },
  limit: number,
  accountData: IUserData[],
  prevAccountData: IUserCursor[]
): z.infer<typeof userPageSchema> {
  // format data
  let data = [];
  for (const account of accountData) {
    data.push({
      user_id: account.user_id,
      username: account.username,
      first_name: account.first_name,
      last_name: account.last_name,
      // TODO: calculate followers/following count
      followers_count: 0,
      following_count: 0,
      avatar_url: account.avatar_url ?? '',
      api_path: `v1/users/${account.user_id}`,
      created_at: account.created_at,
    });
  }

  // format next cursor
  const next_cursor =
    data.length > limit
      ? btoa(
          JSON.stringify({
            userId: data[data.length - 1]!.user_id,
            // createdAt: data[data.length - 1]!.created_at,
          })
        )
      : '';

  data = data.slice(0, limit); // trim to limit

  // format previous cursor
  let previous_cursor = '';
  if (prevAccountData.length && prevAccountData.length > limit) {
    previous_cursor = btoa(
      JSON.stringify({
        userId: prevAccountData[prevAccountData.length - 1]!.user_id,
        // createdAt: prevAccountData[prevAccountData.length - 1]!.created_at,
      })
    );
  }

  // encode cursor
  const encodedCursor = cursor ? btoa(JSON.stringify(cursor)) : '';

  return {
    page: {
      limit: data.length,
      cursor: encodedCursor,
      next_cursor,
      previous_cursor,
    },
    data,
  };
}

/**
 *
 * @param cursor
 * @param limit
 * @param venueData
 * @param prevVenueData
 * @returns
 */
export function formatVenuesPayload(
  cursor: '' | { venueId: string },
  limit: number,
  venueData: IVenueData[],
  prevVenueData: IVenueCursor[]
): z.infer<typeof venuePageSchema> {
  // format data
  let data = [];
  for (const venue of venueData) {
    data.push({
      venue_id: venue.venue_id,
      name: venue.venue_name,
      location: venue.location,
      capacity: venue.capacity,
      api_path: `v1/venues/${venue.venue_id}`,
    });
  }

  // format next cursor
  const next_cursor =
    data.length > limit
      ? btoa(
          JSON.stringify({
            venueId: data[data.length - 1]!.venue_id,
            // createdAt: data[data.length - 1]!.created_at,
          })
        )
      : '';

  data = data.slice(0, limit); // trim to limit

  // format previous cursor
  let previous_cursor = '';
  if (prevVenueData.length && prevVenueData.length > limit) {
    previous_cursor = btoa(
      JSON.stringify({
        venueId: prevVenueData[prevVenueData.length - 1]!.venue_id,
        // createdAt: prevVenueData[prevVenueData.length - 1]!.created_at,
      })
    );
  }

  // encode cursor
  const encodedCursor = cursor ? btoa(JSON.stringify(cursor)) : '';

  return {
    page: {
      limit: data.length,
      cursor: encodedCursor,
      next_cursor,
      previous_cursor,
    },
    data,
  };
}

/**
 *
 * @param cursor
 * @param limit
 * @param eventData
 * @param prevEventData
 * @returns
 */
export function formatEventsPayload(
  cursor: '' | { eventId: string },
  limit: number,
  eventData: IEventData[],
  prevEventData: IEventCursor[]
): z.infer<typeof eventPageSchema> {
  // format data
  let data = [];
  for (const event of eventData) {
    data.push({
      event_id: event.event_id,
      event_name: event.event_name,
      api_path: `v1/events/${event.event_id}`,
    });
  }

  // format next cursor
  const next_cursor =
    data.length > limit
      ? btoa(
          JSON.stringify({
            eventId: data[data.length - 1]!.event_id,
            // createdAt: data[data.length - 1]!.created_at,
          })
        )
      : '';

  data = data.slice(0, limit); // trim to limit

  // format previous cursor
  let previous_cursor = '';
  if (prevEventData.length && prevEventData.length > limit) {
    previous_cursor = btoa(
      JSON.stringify({
        eventId: prevEventData[prevEventData.length - 1]!.event_id,
        // createdAt: prevEventData[prevEventData.length - 1]!.created_at,
      })
    );
  }

  // encode cursor
  const encodedCursor = cursor ? btoa(JSON.stringify(cursor)) : '';

  return {
    page: {
      limit: data.length,
      cursor: encodedCursor,
      next_cursor,
      previous_cursor,
    },
    data,
  };
}

/**
 *
 * @param cursor
 * @param limit
 * @param seriesData
 * @param prevSeriesData
 * @returns
 */
export function formatSeriesPayload(
  cursor: '' | { seriesId: string },
  limit: number,
  seriesData: ISeriesData[],
  prevSeriesData: ISeriesCursor[]
): z.infer<typeof seriesPageSchema> {
  // format data
  let data = [];
  for (const series of seriesData) {
    data.push({
      series_id: series.series_id,
      series_name: series.series_name,
      api_path: `v1/series/${series.series_id}`,
    });
  }

  // format next cursor
  const next_cursor =
    data.length > limit
      ? btoa(
          JSON.stringify({
            seriesId: data[data.length - 1]!.series_id,
            // createdAt: data[data.length - 1]!.created_at,
          })
        )
      : '';

  data = data.slice(0, limit); // trim to limit

  // format previous cursor
  let previous_cursor = '';
  if (prevSeriesData.length && prevSeriesData.length > limit) {
    previous_cursor = btoa(
      JSON.stringify({
        seriesId: prevSeriesData[prevSeriesData.length - 1]!.series_id,
        // createdAt: prevSeriesData[prevSeriesData.length - 1]!.created_at,
      })
    );
  }

  // encode cursor
  const encodedCursor = cursor ? btoa(JSON.stringify(cursor)) : '';

  return {
    page: {
      limit: data.length,
      cursor: encodedCursor,
      next_cursor,
      previous_cursor,
    },
    data,
  };
}

/**
 *
 * @param cursor
 * @param limit
 * @param artistData
 * @param prevArtistData
 * @returns
 */
export function formatArtistsPayload(
  cursor: '' | { artistId: string },
  limit: number,
  artistData: IArtistData[],
  prevArtistData: IArtistCursor[]
): z.infer<typeof artistPageSchema> {
  // format data
  let data = [];
  for (const artist of artistData) {
    data.push({
      artist_id: artist.artist_id,
      artist_name: artist.artist_name,
      api_path: `v1/artists/${artist.artist_id}`,
    });
  }

  // format next cursor
  const next_cursor =
    data.length > limit
      ? btoa(
          JSON.stringify({
            artistId: data[data.length - 1]!.artist_id,
            // createdAt: data[data.length - 1]!.created_at,
          })
        )
      : '';

  data = data.slice(0, limit); // trim to limit

  // format previous cursor
  let previous_cursor = '';
  if (prevArtistData.length && prevArtistData.length > limit) {
    previous_cursor = btoa(
      JSON.stringify({
        artistId: prevArtistData[prevArtistData.length - 1]!.artist_id,
        // createdAt: prevArtistData[prevArtistData.length - 1]!.created_at,
      })
    );
  }

  // encode cursor
  const encodedCursor = cursor ? btoa(JSON.stringify(cursor)) : '';

  return {
    page: {
      limit: data.length,
      cursor: encodedCursor,
      next_cursor,
      previous_cursor,
    },
    data,
  };
}

// TODO: implement
export function formatReviewsPayload() {}
