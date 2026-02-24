import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
// import 'tsconfig-paths/register';

declare global {
    var __TESTCONTAINER__: StartedPostgreSqlContainer;
}

export default async () => {
    console.log('Setting up test environment...');

    // Inject base environment variables
    dotenv.config({ path: path.resolve(dirname(fileURLToPath(import.meta.url)), '../../.env') });

    // Start a PostgreSQL container instance
    console.log('Starting PostgreSQL container...');
    const container = await new PostgreSqlContainer('postgres:15-alpine')
        .withDatabase(process.env.DB_NAME || 'test_db')
        .withUsername(process.env.DB_USER || 'test_user')
        .withPassword(process.env.DB_PASSWORD || 'test_password')
        .start();
    console.log('PostgreSQL container started.');

    // Crucial step: After the container starts, its port and other details are dynamically assigned.
    // We need to overwrite the environment variables with these real connection parameters
    // so that the application can connect to the correct database instance during tests.
    Object.assign(process.env, {
        DB_HOST: container.getHost(),
        DB_USER: container.getUsername(),
        DB_PASSWORD: container.getPassword(),
        DB_PORT: container.getPort().toString(),
        DB_NAME: container.getDatabase(),
    });

    // Run database migrations and seeding
    // Kysely is used as an example here; you can replace it with your ORM or migration tool
    console.log('Running database migrations and seeding...');
    const kyselyPath = './node_modules/.bin/kysely';
    execSync(`${kyselyPath} migrate:latest && ${kyselyPath} seed:run`);
    console.log('Database is ready.');

    // Store the container instance in a global variable to access it in the teardown script
    globalThis.__TESTCONTAINER__ = container;
};