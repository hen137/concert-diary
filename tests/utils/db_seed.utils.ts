import type { Client } from 'pg';

import fs from 'fs/promises';
import format from 'pg-format';

export async function setSchema(client: Client) {
  for (const tableGroup of [
    'type_tables',
    'primary_tables',
    'user_tables',
    'event_tables',
    'review_tables',
    'relationship_tables',
  ]) {
    const sqlText = await fs.readFile(
      `./database/sql/tables/${tableGroup}.sql`,
      'utf-8'
    );
    await client.query(sqlText);
  }
}

export async function seedTypes(client: Client) {
  const sqlText = 'INSERT INTO %I (type_description, type_id) VALUES (%L, %L);';
  const types = [
    'artist_types',
    'venue_types',
    'series_types',
    'event_types',
    'hash_algorithm_types',
    'role_types',
    'relationship_types',
    'genre_types',
    // 'subgenre_types',
  ];

  for (const type of types) {
    const jsonData: { type_description: string; type_id: number }[] =
      JSON.parse(
        await fs.readFile(
          `./database/db_seed/data/types/${type}.data.json`,
          'utf-8'
        )
      );
    for (const item of jsonData) {
      const sql = format(sqlText, type, item.type_description, item.type_id);
      await client.query(sql);
    }
  }
}
