import type { TableExpressionOrList } from 'kysely';
import type { DB } from '../src/types/database.js';

import artistTypes from './data/artists.types.json' with {type: 'json'};
import eventTypes from './data/events.types.json' with {type: 'json'};
import genreTypes from './data/genres.types.json' with {type: 'json'};
import hashAlgorithmTypes from './data/hash_algorithms.types.json' with {type: 'json'};
import relationshipTypes from './data/relationships.types.json' with {type: 'json'};
import roleTypes from './data/roles.types.json' with {type: 'json'};
import seriesTypes from './data/series.types.json' with {type: 'json'};
// import subgenresTypes from './data/subgenres.types.json' with {type: 'json'};
import venueTypes from './data/venues.types.json' with {type: 'json'};

import { db } from './database.js';

// Deletes all rows from the specified table
export async function wipeTable(table: TableExpressionOrList<DB, never>) {
    await db.deleteFrom(table).execute();
}

// export async function wipe_db() {

// }

// data type doesnt work :()
// export async function insertData(table: keyof DB, data: DB[typeof table][]) {
//     await db.insertInto(table).values(data).execute();
// }

export async function seedTypeTables(wipe: boolean = false) {
    wipe && await wipeTable('artist_types');
    await db.insertInto('artist_types').values(artistTypes).execute();

    wipe && await wipeTable('event_types');
    await db.insertInto('event_types').values(eventTypes).execute();

    wipe && await wipeTable('genre_types');
    await db.insertInto('genre_types').values(genreTypes).execute();

    wipe && await wipeTable('hash_algorithm_types');
    await db.insertInto('hash_algorithm_types').values(hashAlgorithmTypes).execute();

    wipe && await wipeTable('relationship_types');
    await db.insertInto('relationship_types').values(relationshipTypes).execute();

    wipe && await wipeTable('role_types');
    await db.insertInto('role_types').values(roleTypes).execute();

    wipe && await wipeTable('series_types');
    await db.insertInto('series_types').values(seriesTypes).execute();

    // wipe && await wipeTable('subgenres_types');
    // await db.insertInto('subgenres_types').values(subgenresTypes).execute();

    wipe && await wipeTable('venue_types');
    await db.insertInto('venue_types').values(venueTypes).execute();
}