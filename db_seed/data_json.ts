import type {
  Artists,
  Series,
  Venues,
  Events,
  UserAccounts,
  UserProfiles,
  EventReviews,
  Setlists,
  VenueReviewLikes,
  VenueReviews,
  EventReviewLikes,
  ArtistTypes,
  EventTypes,
  VenueTypes,
  GenreTypes,
  HashAlgorithmTypes,
  RelationshipTypes,
  RoleTypes,
  SeriesTypes,
  SubgenresTypes,
} from "../src/types/database.js";

import fs from "fs";
import { faker } from "@faker-js/faker";
import { getTypeValues, jsonFromArray } from "./utils/utils.js";

import {
  artistTypes,
  eventTypes,
  genreTypes,
  hashAlgorithmTypes,
  relationshipTypes,
  roleTypes,
  seriesTypes,
  venueTypes,
} from "./utils/static_data.js";

const destDir = "./db_seed/data/";

// types
console.log("Generating Types as JSON...");

const typesDir = destDir + "types/";
const typesSuffix = ".types.json";

if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

const artistTypeValues = getTypeValues<ArtistTypes>(artistTypes);
jsonFromArray(artistTypeValues, typesDir + "artists" + typesSuffix);

const eventTypeValues = getTypeValues<EventTypes>(eventTypes);
jsonFromArray(eventTypeValues, typesDir + "events" + typesSuffix);

const genreTypeValues = getTypeValues<GenreTypes>(genreTypes);
jsonFromArray(genreTypeValues, typesDir + "genres" + typesSuffix);

const hashAlgorithmTypeValues =
  getTypeValues<HashAlgorithmTypes>(hashAlgorithmTypes);
jsonFromArray(
  hashAlgorithmTypeValues,
  typesDir + "hash_algorithms" + typesSuffix,
);

const relationshipTypeValues =
  getTypeValues<RelationshipTypes>(relationshipTypes);
jsonFromArray(relationshipTypeValues, typesDir + "relationships" + typesSuffix);

const roleTypeValues = getTypeValues<RoleTypes>(roleTypes);
jsonFromArray(roleTypeValues, typesDir + "roles" + typesSuffix);

const seriesTypeValues = getTypeValues<SeriesTypes>(seriesTypes);
jsonFromArray(seriesTypeValues, typesDir + "series" + typesSuffix);

// const subgenresTypeValues = getTypeValues<SubgenresTypes>(subgenresTypes);
// jsonFromArray(subgenresTypeValues, typesDir + "subgenres" + typesSuffix);

const venueTypeValues = getTypeValues<VenueTypes>(venueTypes);
jsonFromArray(venueTypeValues, typesDir + "venues" + typesSuffix);

// primary entities
console.log("Generating Primary Entities as JSON...");

const primaryEntitiesDir = destDir + "primary_entities/";
const primaryEntitiesSuffix = ".primary_entities.json";

if (!fs.existsSync(primaryEntitiesDir)) {
  fs.mkdirSync(primaryEntitiesDir, { recursive: true });
}

// FIXME: Kysely type imcompatabilities

const artistsValues: Artists[] = [];
for (let i = 0; i < 100; i++) {
  artistsValues.push({
    artist_id: faker.string.uuid(),
    type_id: faker.number.int({ min: 1, max: artistTypes.length }),
    artist_name: faker.music.artist(),
    artist_description: null,
    img_url: faker.internet.url(),
    website_url: faker.internet.url(),
  });
}
// console.log(artistsValues);
jsonFromArray(
  artistsValues,
  primaryEntitiesDir + "artists" + primaryEntitiesSuffix,
);

const seriesValues: Series[] = [];
for (let i = 0; i < 20; i++) {
  seriesValues.push({
    series_id: faker.string.uuid(),
    type_id: faker.number.int({ min: 1, max: seriesTypes.length }),
    series_name: faker.lorem.words(3),
    series_description: null,
    img_url: faker.internet.url(),
    avg_rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  });
}
// console.log(seriesValues);
jsonFromArray(
  seriesValues,
  primaryEntitiesDir + "series" + primaryEntitiesSuffix,
);

const venuesValues: Venues[] = [];
for (let i = 0; i < 20; i++) {
  venuesValues.push({
    venue_id: faker.string.uuid(),
    type_id: faker.number.int({ min: 1, max: venueTypes.length }),
    venue_name: faker.lorem.words(3),
    venue_description: null,
    img_url: faker.internet.url(),
    website_url: faker.internet.url(),
    avg_rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  });
}
// console.log(venuesValues);
jsonFromArray(
  venuesValues,
  primaryEntitiesDir + "venues" + primaryEntitiesSuffix,
);

const setlistsValues: Setlists[] = [];
for (let i = 0; i < 35; i++) {
  setlistsValues.push({
    setlist_id: faker.string.uuid(),
    setlist_description: null,
  });
}
// console.log(setlistsValues);
jsonFromArray(
  setlistsValues,
  primaryEntitiesDir + "setlists" + primaryEntitiesSuffix,
);

const eventsValues: Events[] = [];
for (let i = 0; i < 50; i++) {
  eventsValues.push({
    event_id: faker.string.uuid(),
    type_id: faker.number.int({ min: 1, max: eventTypes.length }),
    venue_id: faker.helpers.arrayElement(venuesValues).venue_id,
    series_id: faker.helpers.arrayElement(seriesValues).series_id,
    event_name: faker.lorem.words(3),
    event_description: null,
    img_url: faker.internet.url(),
    event_begin_date: faker.date.future(),
  });
}
// console.log(eventsValues);
jsonFromArray(
  eventsValues,
  primaryEntitiesDir + "events" + primaryEntitiesSuffix,
);

const usersAccountsValues: UserAccounts[] = [];
for (let i = 0; i < 19; i++) {
  usersAccountsValues.push({
    user_id: faker.string.uuid(),
    role_id: faker.number.int({ min: 2, max: roleTypes.length }),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password_hash: faker.string.alphanumeric(128),
    password_salt: faker.string.alphanumeric(64),
    hash_algorithm_id: faker.number.int({
      min: 1,
      max: hashAlgorithmTypes.length,
    }),
  });
} // TODO: append admin user
const adminUser: UserAccounts = {
  user_id: faker.string.uuid(),
  role_id: 1,
  username: faker.internet.username(),
  email: faker.internet.email(),
  password_hash: faker.string.alphanumeric(128),
  password_salt: faker.string.alphanumeric(64),
  hash_algorithm_id: faker.number.int({
    min: 1,
    max: hashAlgorithmTypes.length,
  }),
};
// console.log(usersAccountsValues);
jsonFromArray(
  usersAccountsValues,
  primaryEntitiesDir + "user_accounts" + primaryEntitiesSuffix,
);

const userProfilesValues: UserProfiles[] = [];
for (let i = 0; i < usersAccountsValues.length; i++) {
  userProfilesValues.push({
    user_id: usersAccountsValues[i]?.user_id,
    date_of_birth: faker.date.past(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    gender: faker.person.sex(),
    address_line: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
  });
}
// console.log(userProfilesValues);
jsonFromArray(
  userProfilesValues,
  primaryEntitiesDir + "user_profiles" + primaryEntitiesSuffix,
);

const venueReviewsValues: VenueReviews[] = [];
for (let i = 0; i < 50; i++) {
  venueReviewsValues.push({
    review_id: faker.string.uuid(),
    user_id: faker.helpers.arrayElement(usersAccountsValues).user_id,
    venue_id: faker.helpers.arrayElement(venuesValues).venue_id,
    event_id: faker.helpers.arrayElement(eventsValues).event_id,
    rating: faker.number.int({ min: 1, max: 5 }),
    review_text: faker.lorem.sentences(2),
    datetime_created: faker.date.past(),
  });
}
// console.log(venueReviewsValues);
jsonFromArray(
  venueReviewsValues,
  primaryEntitiesDir + "venue_reviews" + primaryEntitiesSuffix,
);

const eventReviewsValues: EventReviews[] = [];
for (let i = 0; i < 50; i++) {
  eventReviewsValues.push({
    review_id: faker.string.uuid(),
    user_id: faker.helpers.arrayElement(usersAccountsValues).user_id,
    event_id: faker.helpers.arrayElement(eventsValues).event_id,
    rating: faker.number.int({ min: 1, max: 5 }),
    review_text: faker.lorem.sentences(2),
    datetime_created: faker.date.past(),
  });
}
// console.log(eventReviewsValues);
jsonFromArray(
  eventReviewsValues,
  primaryEntitiesDir + "event_reviews" + primaryEntitiesSuffix,
);

const venueReviewLikesValues: VenueReviewLikes[] = [];
for (let i = 0; i < 100; i++) {
  venueReviewLikesValues.push({
    like_id: faker.string.uuid(),
    review_id: faker.helpers.arrayElement(venueReviewsValues).review_id,
    datetime_created: faker.date.past(),
  });
}
// console.log(venueReviewLikesValues);
jsonFromArray(
  venueReviewLikesValues,
  primaryEntitiesDir + "venue_review_likes" + primaryEntitiesSuffix,
);

const eventReviewLikesValues: EventReviewLikes[] = [];
for (let i = 0; i < 100; i++) {
  eventReviewLikesValues.push({
    like_id: faker.string.uuid(),
    review_id: faker.helpers.arrayElement(eventReviewsValues).review_id,
    datetime_created: faker.date.past(),
  });
}
// console.log(eventReviewLikesValues);
jsonFromArray(
  eventReviewLikesValues,
  primaryEntitiesDir + "event_review_likes" + primaryEntitiesSuffix,
);

// relationships
console.log("Generating Relationships as JSON...");

const relationshipsDir = destDir + "relationships/";
const relationshipsSuffix = ".relationships.json";

if (!fs.existsSync(relationshipsDir)) {
  fs.mkdirSync(relationshipsDir, { recursive: true });
}

// TODO: generate relationship json
