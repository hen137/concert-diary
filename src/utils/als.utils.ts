import type { FastifyBaseLogger } from 'fastify';
import type { Session, User } from 'better-auth';

import { AsyncLocalStorage } from 'async_hooks';

export type AuthSession = { session: Session; user: User };

type IAsyncStore = {
  logger: FastifyBaseLogger;
  session?: AuthSession;
};

const asyncStore = new AsyncLocalStorage<IAsyncStore>();

const getLogger = (): FastifyBaseLogger => {
  const store = asyncStore.getStore();

  if (!store) {
    throw new Error('Logger could not be found in the current async context.');
  }
  return store.logger;
};

const getSession = () => {
  const store = asyncStore.getStore();

  if (!store) {
    throw new Error('Session could not be found in the current async context.');
  }
  return store.session;
};

const setSession = (sessionData: AuthSession) => {
  const store = asyncStore.getStore();
  if (!store) {
    throw new Error('Session could not be found in the current async context.');
  }
  store.session = sessionData;
};

export const ALS = {
  asyncStore,
  getLogger,
  getSession,
  setSession,
};
