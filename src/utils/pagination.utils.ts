import type { IUserCursor, IUserData } from '../types/query_data.js';

import z from 'zod';
import { userPageSchema } from '../schemas/users.schema.js';

const MIN_LIMIT = 1;
const MAX_LIMIT = 100;

export function validateCursorLimit<Schema extends z.ZodObject>(
  encodedCursor: string,
  limit: number,
  cursorSchema: Schema
): {
  cursor: '' | z.output<Schema>;
  limit: number;
} {
  let cursor: '' | z.output<Schema> = '';
  limit = Math.min(Math.max(limit, MIN_LIMIT), MAX_LIMIT); // ensure limit lies in [1,100]

  if (encodedCursor) {
    const decodedCursor = JSON.parse(atob(encodedCursor)); // decode cursor
    cursor = cursorSchema.parse(decodedCursor); // validate cursor contents
  }

  return { cursor, limit };
}

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
            createdAt: data[data.length - 1]!.created_at,
          })
        )
      : '';

  data = data.slice(0, limit); // trim to limit

  // format previous cursor
  // const previous_cursor = prevAccountData.length
  //   ? btoa(
  //       JSON.stringify({
  //         userId: prevAccountData.user_id,
  //         createdAt: prevAccountData.created_at,
  //       })
  //     )
  //   : '';
  let previous_cursor = '';
  if (prevAccountData.length && prevAccountData.length > limit) {
    previous_cursor = btoa(
      JSON.stringify({
        userId: prevAccountData[prevAccountData.length - 1]!.user_id,
        createdAt: prevAccountData[prevAccountData.length - 1]!.created_at,
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

export async function formatVenuesPayload() {}

export async function formatEventsPayload() {}

export async function formatSeriesPayload() {}

export async function formatArtistPayload() {}

export async function formatReviewsPayload() {}
