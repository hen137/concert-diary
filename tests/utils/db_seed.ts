import fs from "fs/promises";
import { Client } from "pg";

export async function setSchema(client: Client) {
  client.connect();

  for (const file in [
    "type_tables.sql",
    "primary_tables.sql",
    "user_tables.sql",
    "event_tables.sql",
    "review_tables.sql",
    "relationship_tables.sql",
  ]) {
    const sqlText = await fs.readFile(`./sql/tables/${file}`, "utf-8");
    await client.query(sqlText);
  }

  client.end();
}

export async function seedTypes(client: Client) {
  client.connect();

  const sqlText =
    "INSERT INTO $1 (type_description, type_id) VALUE ($2, $3)";
  const typePairs = [
    { table: "artist_types", jsonFile: "artists_types.data.json" },
    { table: "venue_types", jsonFile: "venues_types.data.json" },
    { table: "series_types", jsonFile: "series_types.data.json" },
    { table: "event_types", jsonFile: "events_types.data.json" },
    {
      table: "hash_algorithm_types",
      jsonFile: "hash_algorithms_types.data.json",
    },
    { table: "role_types", jsonFile: "roles_types.data.json" },
    { table: "relationship_types", jsonFile: "relationshipTypes" },
    { table: "genre_types", jsonFile: "genres_types.data.json" },
    //   { table: "subgenres_types", jsonFile: "subgenres_types.data.json" }
  ];

  for (const typePair of typePairs) {
    const jsonData: { type_description: string; type_id: string }[] =
      JSON.parse(
        await fs.readFile(`./data/types/${typePair.jsonFile}`, "utf-8"),
      );
    for (const item of jsonData) {
      await client.query(sqlText, [
        typePair.table,
        item.type_description,
        item.type_id,
      ]);
    }
  }

  client.end();
}
