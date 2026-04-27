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
  UserRelationships,
  // SubgenresTypes,
} from '../../src/types/database.js';

import fs from 'fs';
import { faker } from '@faker-js/faker';
import { getTypeValues, jsonFromArray } from './utils/utils.js';

import {
  artistTypes,
  eventTypes,
  genreTypes,
  hashAlgorithmTypes,
  relationshipTypes,
  roleTypes,
  seriesTypes,
  venueTypes,
} from './utils/static_data.js';

const destDir = './db_seed/data/';
const suffix = '.data.json';

// FIX: Kysely type imcompatabilities
// TODO: generate case specific entities and relationships

// types
export function generateTypesJSON() {
  console.log('Generating Types as JSON...');

  const typesDir = destDir + 'types/';
  const typeInfix = '_types';

  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }

  const artistTypeValues = getTypeValues<ArtistTypes>(artistTypes);
  jsonFromArray(artistTypeValues, typesDir + 'artists' + typeInfix + suffix);

  const eventTypeValues = getTypeValues<EventTypes>(eventTypes);
  jsonFromArray(eventTypeValues, typesDir + 'events' + typeInfix + suffix);

  const genreTypeValues = getTypeValues<GenreTypes>(genreTypes);
  jsonFromArray(genreTypeValues, typesDir + 'genres' + typeInfix + suffix);

  const hashAlgorithmTypeValues =
    getTypeValues<HashAlgorithmTypes>(hashAlgorithmTypes);
  jsonFromArray(
    hashAlgorithmTypeValues,
    typesDir + 'hash_algorithms' + typeInfix + suffix
  );

  const relationshipTypeValues =
    getTypeValues<RelationshipTypes>(relationshipTypes);
  jsonFromArray(
    relationshipTypeValues,
    typesDir + 'relationships' + typeInfix + suffix
  );

  const roleTypeValues = getTypeValues<RoleTypes>(roleTypes);
  jsonFromArray(roleTypeValues, typesDir + 'roles' + typeInfix + suffix);

  const seriesTypeValues = getTypeValues<SeriesTypes>(seriesTypes);
  jsonFromArray(seriesTypeValues, typesDir + 'series' + typeInfix + suffix);

  // const subgenresTypeValues = getTypeValues<SubgenresTypes>(subgenresTypes);
  // jsonFromArray(subgenresTypeValues, typesDir + "subgenres" + typeInfix + suffix);

  const venueTypeValues = getTypeValues<VenueTypes>(venueTypes);
  jsonFromArray(venueTypeValues, typesDir + 'venues' + typeInfix + suffix);
}

// primary entities
export function generatePrimaryEntitiesJSON() {
  console.log('Generating Primary Entities as JSON...');

  const primaryEntitiesDir = destDir + 'primary_entities/';
  const primaryEntitiesInfix = '_primary_entities';

  if (!fs.existsSync(primaryEntitiesDir)) {
    fs.mkdirSync(primaryEntitiesDir, { recursive: true });
  }

  const artistsValues: Artists[] = [];
  for (let i = 0; i < 100; i++) {
    artistsValues.push({
      artist_id: faker.string.uuid({
        version: 7,
      }) as unknown as Artists['artist_id'],
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
    primaryEntitiesDir + 'artists' + primaryEntitiesInfix + suffix
  );

  const seriesValues: Series[] = [];
  for (let i = 0; i < 20; i++) {
    seriesValues.push({
      series_id: faker.string.uuid({
        version: 7,
      }) as unknown as Series['series_id'],
      type_id: faker.number.int({ min: 1, max: seriesTypes.length }),
      series_name: faker.lorem.words(3),
      series_description: null,
      img_url: faker.internet.url(),
      avg_rating: faker.number.float({
        min: 1,
        max: 5,
        fractionDigits: 1,
      }) as unknown as Series['avg_rating'],
    });
  }
  // console.log(seriesValues);
  jsonFromArray(
    seriesValues,
    primaryEntitiesDir + 'series' + primaryEntitiesInfix + suffix
  );

  const venuesValues: Venues[] = [];
  for (let i = 0; i < 20; i++) {
    venuesValues.push({
      venue_id: faker.string.uuid({
        version: 7,
      }) as unknown as Venues['venue_id'],
      type_id: faker.number.int({ min: 1, max: venueTypes.length }),
      venue_name: faker.lorem.words(3),
      venue_description: null,
      img_url: faker.internet.url(),
      website_url: faker.internet.url(),
      avg_rating: faker.number.float({
        min: 1,
        max: 5,
        fractionDigits: 1,
      }) as unknown as Venues['avg_rating'],
    });
  }
  // console.log(venuesValues);
  jsonFromArray(
    venuesValues,
    primaryEntitiesDir + 'venues' + primaryEntitiesInfix + suffix
  );

  const setlistsValues: Setlists[] = [];
  for (let i = 0; i < 35; i++) {
    setlistsValues.push({
      setlist_id: faker.string.uuid({
        version: 7,
      }) as unknown as Setlists['setlist_id'],
      setlist_description: null,
    });
  }
  // console.log(setlistsValues);
  jsonFromArray(
    setlistsValues,
    primaryEntitiesDir + 'setlists' + primaryEntitiesInfix + suffix
  );

  const eventsValues: Events[] = [];
  for (let i = 0; i < 50; i++) {
    eventsValues.push({
      event_id: faker.string.uuid({
        version: 7,
      }) as unknown as Events['event_id'],
      type_id: faker.number.int({ min: 1, max: eventTypes.length }),
      venue_id: faker.helpers.arrayElement(venuesValues)
        .venue_id as unknown as Events['venue_id'],
      series_id: faker.helpers.arrayElement(seriesValues)
        .series_id as unknown as Events['series_id'],
      event_name: faker.lorem.words(3),
      event_description: null,
      img_url: faker.internet.url(),
      event_begin_date:
        faker.date.future() as unknown as Events['event_begin_date'],
      event_end_date:
        faker.date.future() as unknown as Events['event_end_date'],
      event_time: faker.date.future() as unknown as Events['event_time'],
      setlist_id: faker.helpers.arrayElement(setlistsValues)
        .setlist_id as unknown as Events['setlist_id'],
      tickets_required:
        faker.datatype.boolean() as unknown as Events['tickets_required'],
      tickets_url: faker.internet.url(),
      cancelled: faker.datatype.boolean() as unknown as Events['cancelled'],
    });
  }
  // console.log(eventsValues);
  jsonFromArray(
    eventsValues,
    primaryEntitiesDir + 'events' + primaryEntitiesInfix + suffix
  );

  const usersAccountsValues: UserAccounts[] = [];
  for (let i = 0; i < 50; i++) {
    usersAccountsValues.push({
      user_id: faker.string.uuid({
        version: 7,
      }) as unknown as UserAccounts['user_id'],
      role_id: faker.number.int({ min: 2, max: roleTypes.length }),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password_hash: faker.string.alphanumeric(128),
      password_salt: faker.string.alphanumeric(64),
      hash_algorithm_id: faker.number.int({
        min: 1,
        max: hashAlgorithmTypes.length,
      }),
      created_at: faker.date.past() as unknown as UserAccounts['created_at'],
      activated_at:
        faker.date.past() as unknown as UserAccounts['activated_at'],
      deactivated_at: null,
      active: true as unknown as UserAccounts['active'],
      email_verified:
        faker.datatype.boolean() as unknown as UserAccounts['email_verified'],
      updated_at: null as unknown as UserAccounts['updated_at'],
    });
  }
  const adminUser: UserAccounts = {
    user_id: faker.string.uuid({
      version: 7,
    }) as unknown as UserAccounts['user_id'],
    role_id: 1,
    username: faker.internet.username(),
    email: faker.internet.email(),
    password_hash: faker.string.alphanumeric(128),
    password_salt: faker.string.alphanumeric(64),
    hash_algorithm_id: faker.number.int({
      min: 1,
      max: hashAlgorithmTypes.length,
    }),
    created_at: faker.date.past() as unknown as UserAccounts['created_at'],
    activated_at: faker.date.past() as unknown as UserAccounts['activated_at'],
    deactivated_at: null,
    active: true as unknown as UserAccounts['active'],
    email_verified:
      faker.datatype.boolean() as unknown as UserAccounts['email_verified'],
    updated_at: null as unknown as UserAccounts['updated_at'],
  };
  usersAccountsValues.push(adminUser);
  // console.log(usersAccountsValues);
  jsonFromArray(
    usersAccountsValues,
    primaryEntitiesDir + 'user_accounts' + primaryEntitiesInfix + suffix
  );

  const userProfilesValues: UserProfiles[] = [];
  for (let i = 0; i < usersAccountsValues.length; i++) {
    userProfilesValues.push({
      user_id: usersAccountsValues[i]
        ?.user_id as unknown as UserProfiles['user_id'],
      date_of_birth:
        faker.date.past() as unknown as UserProfiles['date_of_birth'],
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      gender: faker.person.sex(),
      address_line: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      region: faker.location.state(),
      postal_code: faker.location.zipCode(),
      phone_number: faker.phone.number(),
      avatar_url: faker.internet.url(),
    });
  }
  // console.log(userProfilesValues);
  jsonFromArray(
    userProfilesValues,
    primaryEntitiesDir + 'user_profiles' + primaryEntitiesInfix + suffix
  );

  const venueReviewsValues: VenueReviews[] = [];
  for (let i = 0; i < 50; i++) {
    venueReviewsValues.push({
      review_id: faker.string.uuid({
        version: 7,
      }) as unknown as VenueReviews['review_id'],
      user_id: faker.helpers.arrayElement(usersAccountsValues)
        .user_id as unknown as VenueReviews['user_id'],
      venue_id: faker.helpers.arrayElement(venuesValues)
        .venue_id as unknown as VenueReviews['venue_id'],
      event_id: faker.helpers.arrayElement(eventsValues)
        .event_id as unknown as VenueReviews['event_id'],
      rating: faker.number.int({
        min: 1,
        max: 5,
      }) as unknown as VenueReviews['rating'],
      review_text: faker.lorem.sentences(
        2
      ) as unknown as VenueReviews['review_text'],
      datetime_created:
        faker.date.past() as unknown as VenueReviews['datetime_created'],
    });
  }
  // console.log(venueReviewsValues);
  jsonFromArray(
    venueReviewsValues,
    primaryEntitiesDir + 'venue_reviews' + primaryEntitiesInfix + suffix
  );

  const eventReviewsValues: EventReviews[] = [];
  for (let i = 0; i < 50; i++) {
    eventReviewsValues.push({
      review_id: faker.string.uuid({
        version: 7,
      }) as unknown as EventReviews['review_id'],
      user_id: faker.helpers.arrayElement(usersAccountsValues)
        .user_id as unknown as EventReviews['user_id'],
      event_id: faker.helpers.arrayElement(eventsValues)
        .event_id as unknown as EventReviews['event_id'],
      rating: faker.number.int({
        min: 1,
        max: 5,
      }) as unknown as EventReviews['rating'],
      review_text: faker.lorem.sentences(
        2
      ) as unknown as EventReviews['review_text'],
      datetime_created:
        faker.date.past() as unknown as EventReviews['datetime_created'],
    });
  }
  // console.log(eventReviewsValues);
  jsonFromArray(
    eventReviewsValues,
    primaryEntitiesDir + 'event_reviews' + primaryEntitiesInfix + suffix
  );

  const venueReviewLikesValues: VenueReviewLikes[] = [];
  for (let i = 0; i < 100; i++) {
    venueReviewLikesValues.push({
      like_id: faker.string.uuid({ version: 7 }),
      review_id: faker.helpers.arrayElement(venueReviewsValues)
        .review_id as unknown as VenueReviewLikes['review_id'],
      datetime_created:
        faker.date.past() as unknown as VenueReviewLikes['datetime_created'],
    });
  }
  // console.log(venueReviewLikesValues);
  jsonFromArray(
    venueReviewLikesValues,
    primaryEntitiesDir + 'venue_review_likes' + primaryEntitiesInfix + suffix
  );

  const eventReviewLikesValues: EventReviewLikes[] = [];
  for (let i = 0; i < 100; i++) {
    eventReviewLikesValues.push({
      like_id: faker.string.uuid({ version: 7 }),
      review_id: faker.helpers.arrayElement(eventReviewsValues)
        .review_id as unknown as EventReviewLikes['review_id'],
      datetime_created:
        faker.date.past() as unknown as EventReviewLikes['datetime_created'],
    });
  }
  // console.log(eventReviewLikesValues);
  jsonFromArray(
    eventReviewLikesValues,
    primaryEntitiesDir + 'event_review_likes' + primaryEntitiesInfix + suffix
  );

  return {
    artistsValues,
    seriesValues,
    venuesValues,
    eventsValues,
    usersAccountsValues,
    userProfilesValues,
    venueReviewsValues,
    eventReviewsValues,
    venueReviewLikesValues,
    eventReviewLikesValues,
  };
}

// relationships
export function generateRelationshipsJSON(userProfilesValues: UserProfiles[]) {
  console.log('Generating Relationships as JSON...');

  const relationshipsDir = destDir + 'relationships/';
  const relationshipsInfix = '_relationship';

  if (!fs.existsSync(relationshipsDir)) {
    fs.mkdirSync(relationshipsDir, { recursive: true });
  }

  // TODO: generate relationship json

  const userRelationshipValues: UserRelationships[] = [];
  // for (const userProfile of userProfilesValues) {
  //   let targetUser;
  //   while (true) {
  //     targetUser = faker.helpers.arrayElement(userProfilesValues);
  //     if (targetUser.user_id !== userProfile.user_id) break;
  //   }
  //   userRelationshipValues.push({
  //     relationship_type_id: faker.number.int({min: 1, max: relationshipTypes.length}),
  //     initiator_id: userProfile.user_id,
  //     target_id: targetUser.user_id,
  //   });
  for (let i = 0; i < 100; i++) {
    const initiatorUser = faker.helpers.arrayElement(userProfilesValues);
    let targetUser;
    while (true) {
      targetUser = faker.helpers.arrayElement(userProfilesValues);
      if (targetUser.user_id !== initiatorUser.user_id) break;
    }
    userRelationshipValues.push({
      relationship_type_id: faker.number.int({
        min: 1,
        max: relationshipTypes.length,
      }),
      initiator_id: initiatorUser.user_id,
      target_id: targetUser.user_id,
    });
  }
  // console.log(userRelationshipValues);
  jsonFromArray(
    userRelationshipValues,
    relationshipsDir + 'user_relationships' + relationshipsInfix + suffix
  );
}

generateTypesJSON();
const { userProfilesValues } = generatePrimaryEntitiesJSON();
generateRelationshipsJSON(userProfilesValues);
