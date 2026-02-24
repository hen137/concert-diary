import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

export default async () => {
  console.log('\nTearing down test environment...');

  const container: StartedPostgreSqlContainer = globalThis.__TESTCONTAINER__;

  if (container) {
    await container.stop();
    console.log('Container stopped successfully.');
  }
};