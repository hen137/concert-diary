import fs from "fs/promises";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { Client } from "pg";

// FIX: https://github.com/kulshekhar/ts-jest/issues/4127
// import { setSchema, seedTypes } from "./db_seed.js";

declare global {
  var __TESTCONTAINER__: StartedPostgreSqlContainer;
}

export default async () => {
  console.log("Global Setup");

  // CONSIDER: setting env variables here instead of passing .env.test
  // CONSIDER: staging an auth token

  console.log("Starting PostgreSQL container...");

  // TODO: confirm pg version
  const container = await new PostgreSqlContainer("postgres:latest")
    .withDatabase(process.env.POSTGRES_DB!)
    .withUsername(process.env.POSTGRES_USER!)
    .withPassword(process.env.POSTGRES_PASSWORD!)
    .start();

  // CONSIDER: audit container details

  console.log("PostgreSQL container started.");

  // After the container starts, its port and other details are dynamically assigned.
  // We need to overwrite the environment variables with these real connection parameters
  // so that the application can connect to the correct database instance during tests.
  Object.assign(process.env, {
    POSTGRES_HOST: container.getHost() == "localhost" ? "0.0.0.0" : null, // causes a 57P01 error is host is 'localhost'
    POSTGRES_PORT: container.getPort().toString(),
  });

  console.log("Running database migrations and seeding...");

  // establish a database connection
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!, 10),
    database: process.env.POSTGRES_DB,
  });

  await client.connect();

  // define database schema
  for (const tableGroup of [
    "type_tables",
    "primary_tables",
    "user_tables",
    "event_tables",
    "review_tables",
    "relationship_tables",
  ]) {
    const sqlText = await fs.readFile(
      `./sql/tables/${tableGroup}.sql`,
      "utf-8",
    );
    await client.query(sqlText);
  }

  // populate with type data
  for (const typePair of [
    { table: "artist_types", jsonFile: "artists_types.data.json" },
    { table: "venue_types", jsonFile: "venues_types.data.json" },
    { table: "series_types", jsonFile: "series_types.data.json" },
    { table: "event_types", jsonFile: "events_types.data.json" },
    {
      table: "hash_algorithm_types",
      jsonFile: "hash_algorithms_types.data.json",
    },
    { table: "role_types", jsonFile: "roles_types.data.json" },
    { table: "relationship_types", jsonFile: "relationships_types.data.json" },
    { table: "genre_types", jsonFile: "genres_types.data.json" },
    //   { table: "subgenres_types", jsonFile: "subgenres_types.data.json" }
  ]) {
    const jsonData: { type_description: string; type_id: number }[] =
      JSON.parse(
        await fs.readFile(`./db_seed/data/types/${typePair.jsonFile}`, "utf-8"),
      );
    for (const item of jsonData) {
      const values = [item.type_description, item.type_id];
      // FIX: possibly prone to sql injection
      await client.query(
        `INSERT INTO ${typePair.table} (type_description, type_id) VALUES ($1, $2);`,
        values,
      );
    }
  }

  // CONSIDER: populate with data here or per test basis?

  client.end();

  console.log("Database is ready.");

  // Store the container instance in a global variable to access it in the teardown script
  globalThis.__TESTCONTAINER__ = container;
};
