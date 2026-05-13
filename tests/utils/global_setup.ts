import { loadEnvFile } from 'node:process';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Client } from 'pg';
import { seedTypes, setSchema } from '#tests/utils/db_seed.utils.js';

declare global {
  var __TESTCONTAINER__: StartedPostgreSqlContainer;
}

export async function setup() {
  console.log('Global Setup');

  // load test env vars
  loadEnvFile('./env/.env.test');

  console.log('Starting PostgreSQL container...');

  // TODO: confirm pg version
  const pgContainer = await new PostgreSqlContainer('postgres:latest')
    .withDatabase(process.env.POSTGRES_DB!)
    .withUsername(process.env.POSTGRES_USER!)
    .withPassword(process.env.POSTGRES_PASSWORD!)
    .start();

  // CONSIDER: audit pgContainer details

  console.log('PostgreSQL container started.');

  // After the container starts, its port and other details are dynamically assigned.
  // We need to overwrite the environment variables with these real connection parameters
  // so that the application can connect to the correct database instance during tests.
  Object.assign(process.env, {
    POSTGRES_HOST: pgContainer.getHost() == 'localhost' ? '0.0.0.0' : null, // causes a 57P01 error if host is 'localhost'
    POSTGRES_PORT: pgContainer.getPort().toString(),
  });

  console.log('Running database migrations and seeding...');

  // establish a database connection
  const pgClient = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!, 10),
    database: process.env.POSTGRES_DB,
  });
  await pgClient.connect();

  // build and seed database
  await setSchema(pgClient); // define database schema
  await seedTypes(pgClient); // populate type tables
  // CONSIDER: populate with data here or per test basis?

  await pgClient.end();

  console.log('Database is ready.');

  // Store the container instance in a global variable to access it in the teardown script
  globalThis.__TESTCONTAINER__ = pgContainer;
}

export async function teardown() {
  console.log('\nTearing down test environment...');

  const container: StartedPostgreSqlContainer = globalThis.__TESTCONTAINER__;

  if (container) {
    await container.stop();
    console.log('Container stopped successfully.');
  }
}
