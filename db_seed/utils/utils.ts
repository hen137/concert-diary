import type { TableExpressionOrList } from "kysely";
import type { DB } from "../../src/types/database.js";

import fs from "fs";
import { db } from "../database.js";

// config
const config = {
  num_users: "",
};

// TODO: extract tables dynamically from types or something else
export const tables = [
  "artist_types",
  "artists",
  "artists_genres",
  "artists_series",
  "event_review_likes",
  "event_reviews",
  "event_types",
  "events",
  "events_artists",
  "genre_types",
  "groups_members",
  "hash_algorithm_types",
  "relationship_types",
  "role_types",
  "series",
  "series_types",
  "setlists",
  "subgenres_types",
  "user_accounts",
  "user_profiles",
  "user_relationships",
  "venue_review_likes",
  "venue_reviews",
  "venue_types",
  "venues",
  "venues_series",
];

// Deletes all rows from the specified table
export async function wipeTable(table: TableExpressionOrList<DB, never>) {
  await db.deleteFrom(table).execute();
}

export function jsonFromArray(data: any[], dest: string) {
  fs.writeFileSync(dest, JSON.stringify(data));
}

export function getTypeValues<
  T extends { type_description: string; type_id: number },
>(types: string[]): T[] {
  var i = 1;
  const typeValues: T[] = [];
  for (const type of types) {
    typeValues.push({ type_description: type, type_id: i++ } as T);
  }
  return typeValues;
}
