import type { FastifyInstance } from 'fastify';

import { buildServer } from '../../src/server.js';

/**
 * A helper function used inside a describe block.
 * It automatically handles the creation and destruction of the Fastify instance, ensuring test isolation.
 * @returns A getApp function to safely retrieve the app instance within test cases.
 */
export function setupFastify() {
  const appContainer: { instance: FastifyInstance | null } = { instance: null };

  // Create and initialize the app before all tests in the current describe block run
  beforeAll(async () => {
    appContainer.instance = buildServer({});
    await appContainer.instance.ready(); // Wait for all plugins to be loaded
  });

  // Close the app after all tests in the current describe block have run
  afterAll(async () => {
    await appContainer.instance?.close();
  });

  // Return a closure function so that 'it'/'test' blocks can safely get the initialized app instance
  return {
    getApp: (): FastifyInstance => {
      if (!appContainer.instance) {
        throw new Error(
          'Fastify app instance is not available. Ensure getApp() is called within a test case (it/test).',
        );
      }
      return appContainer.instance;
    },
  };
}