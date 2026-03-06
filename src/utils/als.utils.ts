import type { FastifyBaseLogger } from 'fastify';
import { AsyncLocalStorage } from 'async_hooks';

export type IAsyncStore = {
  logger: FastifyBaseLogger
};

const asyncStore = new AsyncLocalStorage<IAsyncStore>();

// Provide a safe method to get the logger
const getLogger = (): FastifyBaseLogger => {
  const store = asyncStore.getStore();
  
  if (!store) {
    throw new Error('Logger could not be found in the current async context.');
  }
  return store.logger;
};

export const ALS = {
  asyncStore,
  getLogger
};