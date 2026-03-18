import type { Artists, Series, Venues, Events, UserAccounts, UserProfiles, EventReviews, Setlists, VenueReviewLikes, VenueReviews, EventReviewLikes } from '../src/types/database.js';

import { db } from './database.js';
import { faker } from '@faker-js/faker';
// import { v7 as uuidv7 } from 'uuid';
import artistTypes from './data/artists.types.json' with {type: 'json'};
import eventTypes from './data/events.types.json' with {type: 'json'};
import genreTypes from './data/genres.types.json' with {type: 'json'};
import hashAlgorithmTypes from './data/hash_algorithms.types.json' with {type: 'json'};
import relationshipTypes from './data/relationships.types.json' with {type: 'json'};
import roleTypes from './data/roles.types.json' with {type: 'json'};
import seriesTypes from './data/series.types.json' with {type: 'json'};
import subgenresTypes from './data/subgenres.types.json' with {type: 'json'};
import venueTypes from './data/venues.types.json' with {type: 'json'};
import { wipe_table } from './utils.js';


// seeding is needed for testing and development environments

// seeding order:
// type tables
// artists, series, venues setlist tables
// events, users tables
// reviews tables
// likes tables
// relationship tables

const wipeTables = false;
const wipeTypesTables = false

// types
wipeTypesTables && await wipe_table('artist_types');
// await db.insertInto('artist_types').values(artistTypes).execute();

wipeTypesTables && await wipe_table('event_types');
// await db.insertInto('event_types').values(eventTypes).execute();

wipeTypesTables && await wipe_table('genre_types');
// await db.insertInto('genre_types').values(genreTypes).execute();

wipeTypesTables && await wipe_table('hash_algorithm_types');
// await db.insertInto('hash_algorithm_types').values(hashAlgorithmTypes).execute();

wipeTypesTables && await wipe_table('relationship_types');
// await db.insertInto('relationship_types').values(relationshipTypes).execute();

wipeTypesTables && await wipe_table('role_types');
// await db.insertInto('role_types').values(roleTypes).execute();

wipeTypesTables && await wipe_table('series_types');
// await db.insertInto('series_types').values(seriesTypes).execute();

wipeTypesTables && await wipe_table('subgenres_types');
// await db.insertInto('subgenres_types').values(subgenresTypes).execute();

wipeTypesTables && await wipe_table('venue_types');
// await db.insertInto('venue_types').values(venueTypes).execute();

// artists
wipeTables && await wipe_table('artists');
const artistsValues: Artists[] = [];
for (let i = 0; i < 100; i++) {
    artistsValues.push({
        artist_description: null,
        artist_id: faker.string.uuid(),
        artist_name: faker.music.artist(),
        img_url: faker.internet.url(),
        type_id: faker.number.int({ min: 1, max: artistTypes.length }),
        website_url: faker.internet.url(),
    })
}
// console.log(artistsValues[0]);
// await db.insertInto('artists').values(artistsValues).execute();

// series
wipeTables && await wipe_table('series');
const seriesValues: Series[] = [];
for (let i = 0; i < 20; i++) {
    seriesValues.push({
        avg_rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        img_url: faker.internet.url(),
        series_description: null,
        series_id: faker.string.uuid(),
        series_name: faker.lorem.words(3),
        type_id: faker.number.int({ min: 1, max: seriesTypes.length })
    })
}
// console.log(seriesValues[0]);
// await db.insertInto('series').values(seriesValues).execute();

// venues
wipeTables && await wipe_table('venues');
const venuesValues: Venues[] = [];
for (let i = 0; i < 20; i++) {
    venuesValues.push({
        avg_rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        img_url: faker.internet.url(),
        type_id: faker.number.int({ min: 1, max: venueTypes.length }),
        venue_description: null,
        venue_id: faker.string.uuid(),
        venue_name: faker.lorem.words(3),
        website_url: faker.internet.url(),
    })
}
// console.log(venuesValues[0]);
// await db.insertInto('venues').values(venuesValues).execute();

// setlists
wipeTables && await wipe_table('setlists');
const setlistsValues: Setlists[] = [];
for (let i = 0; i < 35; i++) {
    setlistsValues.push({
        setlist_description: null,
        setlist_id: faker.string.uuid(),
    })
}
// console.log(setlistsValues[0]);
// await db.insertInto('setlists').values(setlistsValues).execute();

// events
wipeTables && await wipe_table('events');
const eventsValues: Events[] = [];
for (let i = 0; i < 50; i++) {
    eventsValues.push({
        datetime: faker.date.future(),
        event_description: null,
        event_id: faker.string.uuid(),
        event_name: faker.lorem.words(3),
        img_url: faker.internet.url(),
        type_id: faker.number.int({ min: 1, max: eventTypes.length }),
        venue_id: faker.helpers.arrayElement(venuesValues).venue_id,
    })
}
// console.log(eventsValues[0]);
// await db.insertInto('events').values(eventsValues).execute();

// users
wipeTables && await wipe_table('user_accounts');
const usersAccountsValues: UserAccounts[] = [];
for (let i = 0; i < 20; i++) {
    usersAccountsValues.push({
        user_id: faker.string.uuid(),
        datetime_created: faker.date.past(),
        email: faker.internet.email(),
        hash_algorithm_id: faker.number.int({ min: 1, max: hashAlgorithmTypes.length }),
        password_hash: faker.string.alphanumeric(64),
        username: faker.internet.username(),
    })
}
// console.log(usersAccountsValues[0]);
// await db.insertInto('user_accounts').values(usersAccountsValues).execute();

wipeTables && await wipe_table('user_profiles');
const userProfilesValues: UserProfiles[] = [];
for (let i = 0; i < usersAccountsValues.length; i++) {
    userProfilesValues.push({
        user_id: faker.helpers.arrayElement(usersAccountsValues).user_id,
        address_line: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        date_of_birth: faker.date.past(),
        first_name: faker.person.firstName(),
        gender: faker.person.gender(),
    })
}
// console.log(userProfilesValues[0]);
// await db.insertInto('user_profiles').values(userProfilesValues).execute();

// reviews
wipeTables && await wipe_table('venue_reviews');
const venueReviewsValues: VenueReviews[] = [];
for (let i = 0; i < 50; i++) {
    venueReviewsValues.push({
        datetime_created: faker.date.past(),
        event_id: faker.helpers.arrayElement(eventsValues).event_id,
        rating: faker.number.int({ min: 1, max: 5 }),
        review_id: faker.string.uuid(),
        review_text: faker.lorem.sentences(2),
        user_id: faker.helpers.arrayElement(usersAccountsValues).user_id,
        venue_id: faker.helpers.arrayElement(venuesValues).venue_id,
    })
}
// console.log(venueReviewsValues[0]);
// await db.insertInto('venue_reviews').values(venueReviewsValues).execute();

wipeTables && await wipe_table('event_reviews');
const eventReviewsValues: EventReviews[] = [];
for (let i = 0; i < 50; i++) {
    eventReviewsValues.push({
        datetime_created: faker.date.past(),
        event_id: faker.helpers.arrayElement(eventsValues).event_id,
        rating: faker.number.int({ min: 1, max: 5 }),
        review_id: faker.string.uuid(),
        review_text: faker.lorem.sentences(2),
        user_id: faker.helpers.arrayElement(usersAccountsValues).user_id,
    })
}
// console.log(eventReviewsValues[0]);
// await db.insertInto('event_reviews').values(eventReviewsValues).execute();

// likes
wipeTables && await wipe_table('venue_review_likes');
const venueReviewLikesValues: VenueReviewLikes[] = [];
for (let i = 0; i < 100; i++) {
    venueReviewLikesValues.push({
        datetime_created: faker.date.past(),
        like_id: faker.string.uuid(),
        review_id: faker.helpers.arrayElement(venueReviewsValues).review_id,
    })
}
// console.log(venueReviewLikesValues[0]);
// await db.insertInto('venue_review_likes').values(venueReviewLikesValues).execute();

wipeTables && await wipe_table('event_review_likes');
const eventReviewLikesValues: EventReviewLikes[] = [];
for (let i = 0; i < 100; i++) {
    eventReviewLikesValues.push({
        datetime_created: faker.date.past(),
        like_id: faker.string.uuid(),
        review_id: faker.helpers.arrayElement(eventReviewsValues).review_id,
    })
}
// console.log(eventReviewLikesValues[0]);
// await db.insertInto('event_review_likes').values(eventReviewLikesValues).execute();

// relationships 