import { faker } from "@faker-js/faker";
import { db } from "./database.js";
// import { v7 as uuidv7 } from 'uuid';

import artistTypes from "./data/types/artists_types.data.json" with { type: "json" };
import venueTypes from "./data/types/venues_types.data.json" with { type: "json" };
import seriesTypes from "./data/types/series_types.data.json" with { type: "json" };
import eventTypes from "./data/types/events_types.data.json" with { type: "json" };

import hashAlgorithmTypes from "./data/types/hash_algorithms_types.data.json" with { type: "json" };
import roleTypes from "./data/types/roles_types.data.json" with { type: "json" };
import relationshipTypes from "./data/types/relationships_types.data.json" with { type: "json" };

import genreTypes from "./data/types/genres_types.data.json" with { type: "json" };
// import subgenresTypes from './data/types/subgenres_types.data.json' with {type: 'json'};

import artistsValues from "./data/primary_entities/artists_primary_entities.data.json" with { type: "json" };
import seriesValues from "./data/primary_entities/series_primary_entities.data.json" with { type: "json" };
import venuesValues from "./data/primary_entities/venues_primary_entities.data.json" with { type: "json" };
import setlistsValues from "./data/primary_entities/setlists_primary_entities.data.json" with { type: "json" };

import eventsValues from "./data/primary_entities/events_primary_entities.data.json" with { type: "json" };

import usersAccountsValues from "./data/primary_entities/user_accounts_primary_entities.data.json" with { type: "json" };
import userProfilesValues from "./data/primary_entities/user_profiles_primary_entities.data.json" with { type: "json" };

import venueReviewsValues from "./data/primary_entities/venue_reviews_primary_entities.data.json" with { type: "json" };
import eventReviewsValues from "./data/primary_entities/event_reviews_primary_entities.data.json" with { type: "json" };
import venueReviewLikesValues from "./data/primary_entities/venue_review_likes_primary_entities.data.json" with { type: "json" };
import eventReviewLikesValues from "./data/primary_entities/event_review_likes_primary_entities.data.json" with { type: "json" };

// import X from "./data/relationships/X.relationships.json" with { type: "json" };

// seeding is needed for testing and development environments

// seeding order:
// type tables
// artists, series, venues, setlist tables
// events, users tables
// reviews tables
// likes tables
// relationship tables

// types
export async function seedTypes() {
  console.log("Populating Type Tables...");

  await db.insertInto("artist_types").values(artistTypes).execute();
  await db.insertInto("venue_types").values(venueTypes).execute();
  await db.insertInto("series_types").values(seriesTypes).execute();
  await db.insertInto("event_types").values(eventTypes).execute();

  await db
    .insertInto("hash_algorithm_types")
    .values(hashAlgorithmTypes)
    .execute();
  await db.insertInto("role_types").values(roleTypes).execute();
  await db.insertInto("relationship_types").values(relationshipTypes).execute();

  await db.insertInto("genre_types").values(genreTypes).execute();
  // await db.insertInto('subgenres_types').values(subgenresTypes).execute();
}

// primary entity tables
export async function seedPrimaryEntities() {
  // TODO: make idempotent
  console.log("Populating Primary Entity Tables...");

  await db.insertInto("artists").values(artistsValues).execute();
  await db.insertInto("series").values(seriesValues).execute();
  await db.insertInto("venues").values(venuesValues).execute();
  await db.insertInto("setlists").values(setlistsValues).execute();

  await db.insertInto("events").values(eventsValues).execute();

  await db.insertInto("user_accounts").values(usersAccountsValues).execute();
  await db.insertInto("user_profiles").values(userProfilesValues).execute();
  // await db.insertInto('user_accounts').values(adminUser).execute();
  // await db.insertInto('user_profiles').values({
  //     user_id: adminUser.user_id,
  //     date_of_birth: faker.date.past(),
  //     first_name: faker.person.firstName(),
  //     last_name: faker.person.lastName(),
  //     gender: faker.person.gender(),
  //     address_line: faker.location.streetAddress(),
  //     city: faker.location.city(),
  //     country: faker.location.country(),
  // }).execute();

  await db.insertInto("venue_reviews").values(venueReviewsValues).execute();
  await db.insertInto("event_reviews").values(eventReviewsValues).execute();
  await db
    .insertInto("venue_review_likes")
    .values(venueReviewLikesValues)
    .execute();
  await db
    .insertInto("event_review_likes")
    .values(eventReviewLikesValues)
    .execute();
}

// relationships
export async function seedRelationships() {
  console.log("Populating Relationship Tables...");

  // TODO: insert relationship data
  // await db.insertInto("").values().execute();
}

seedTypes();
seedPrimaryEntities();
seedRelationships();
db.destroy();
