import type { DB } from '../../src/types/database.js';
import { db } from './database.js';

import artistTypes from './data/types/artist_types.data.json' with { type: 'json' };
import venueTypes from './data/types/venue_types.data.json' with { type: 'json' };
import seriesTypes from './data/types/series_types.data.json' with { type: 'json' };
import eventTypes from './data/types/event_types.data.json' with { type: 'json' };

import hashAlgorithmTypes from './data/types/hash_algorithm_types.data.json' with { type: 'json' };
import roleTypes from './data/types/role_types.data.json' with { type: 'json' };
import relationshipTypes from './data/types/relationship_types.data.json' with { type: 'json' };

import genreTypes from './data/types/genre_types.data.json' with { type: 'json' };
// import subgenresTypes from './data/types/subgenres_types.data.json' with {type: 'json'};

import artistsValues from './data/primary_entities/artists_primary_entities.data.json' with { type: 'json' };
import seriesValues from './data/primary_entities/series_primary_entities.data.json' with { type: 'json' };
import venuesValues from './data/primary_entities/venues_primary_entities.data.json' with { type: 'json' };
import setlistsValues from './data/primary_entities/setlists_primary_entities.data.json' with { type: 'json' };

import eventsValues from './data/primary_entities/events_primary_entities.data.json' with { type: 'json' };

import usersAccountsValues from './data/primary_entities/user_accounts_primary_entities.data.json' with { type: 'json' };
import userProfilesValues from './data/primary_entities/user_profiles_primary_entities.data.json' with { type: 'json' };

import venueReviewsValues from './data/primary_entities/venue_reviews_primary_entities.data.json' with { type: 'json' };
import eventReviewsValues from './data/primary_entities/event_reviews_primary_entities.data.json' with { type: 'json' };
import venueReviewLikesValues from './data/primary_entities/venue_review_likes_primary_entities.data.json' with { type: 'json' };
import eventReviewLikesValues from './data/primary_entities/event_review_likes_primary_entities.data.json' with { type: 'json' };

import userRelationshipsValues from './data/relationships/user_relationships_relationship.data.json' with { type: 'json' };

// import X from "./data/relationships/X.relationships.json" with { type: "json" };

// seeding is needed for testing and development environments

// seeding order:
// type tables
// artists, series, venues, setlist tables
// events, users tables
// reviews tables
// likes tables
// relationship tables

async function insertData(table_values: { [key in keyof DB]?: unknown[] }) {
  for (const [table, values] of Object.entries(table_values)) {
    if (values) {
      await db
        .insertInto(table as keyof DB)
        .values(values)
        .onConflict((oc) => oc.doNothing())
        .execute();
    }
  }
}

// types
export async function seedTypes() {
  console.log('Populating Type Tables...');

  await insertData({
    artist_types: artistTypes,
    venue_types: venueTypes,
    series_types: seriesTypes,
    event_types: eventTypes,
    hash_algorithm_types: hashAlgorithmTypes,
    role_types: roleTypes,
    relationship_types: relationshipTypes,
    genre_types: genreTypes,
    // subgenres_types: subgenresTypes,
  });
}

// primary entity tables
export async function seedPrimaryEntities() {
  console.log('Populating Primary Entity Tables...');

  await insertData({
    artists: artistsValues,
    series: seriesValues,
    venues: venuesValues,
    setlists: setlistsValues,
    events: eventsValues,
    user_accounts: usersAccountsValues,
    user_profiles: userProfilesValues,
    venue_reviews: venueReviewsValues,
    event_reviews: eventReviewsValues,
    venue_review_likes: venueReviewLikesValues,
    event_review_likes: eventReviewLikesValues,
  });

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
}

// relationships
export async function seedRelationships() {
  console.log('Populating Relationship Tables...');

  // TODO: insert relationship data

  await insertData({
    user_relationships: userRelationshipsValues,
  });
}

await seedTypes();
await seedPrimaryEntities();
await seedRelationships();
db.destroy();
