import { sql } from 'kysely';
import { db } from './database.js';
import fs from 'fs/promises';
// delete all tables

const tables = [
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
]

for (const table of tables) {
    console.log(`Dropping table ${table}...`);
    await db.schema.dropTable(table).ifExists().cascade().execute();
}

// create tables from sql files
// execution order,
// type_tables.sql
// primary_tables.sql
// user_tables.sql
// event_tables.sql
// review_tables.sql
// relationship_tables.sql

const dir = './sql/tables';
const sqlFiles = [
    'type_tables.sql',
    'primary_tables.sql',
    'user_tables.sql',
    'event_tables.sql',
    'review_tables.sql',
    'relationship_tables.sql'
]

for (const file of sqlFiles) {
    try {
        console.log(`Reading SQL from ${dir}/${file}...`)
        const sqlText = await fs.readFile(`${dir}/${file}`, 'utf-8');
        await sql`${sql.raw(sqlText)}`.execute(db)
    } catch (error) {
        console.error(`Error executing ${dir}/${file}:`, error);
    }
}
