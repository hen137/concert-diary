import type { FastifyBaseLogger } from 'fastify';
import type { Session, User } from 'better-auth';

import { AsyncLocalStorage } from 'async_hooks';

export type AuthSession = { session: Session; user: User };

type NotFoundFlag = 'data' | 'entity';

type IAsyncStore = {
  logger: FastifyBaseLogger;
  session?: AuthSession;
  notFoundFlag?: NotFoundFlag;
};

const asyncStore = new AsyncLocalStorage<IAsyncStore>();

// Logger functions

const getLogger = (): FastifyBaseLogger => {
  const store = asyncStore.getStore();

  if (!store) {
    throw new Error('Logger could not be found in the current async context.');
  }
  return store.logger;
};

// Session functions

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

// Not Found Flag functions

const getNotFoundFlag = () => {
  const store = asyncStore.getStore();

  if (!store)
    throw new Error(
      'Not Found Flag could not be found in the current async context.'
    );

  return store.notFoundFlag;
};

const setNotFoundFlag = (flag: NotFoundFlag) => {
  const store = asyncStore.getStore();

  if (!store)
    throw new Error(
      'Not Found Flag could not be found in the current async context.'
    );

  store.notFoundFlag = flag;
};

export const ALS = {
  asyncStore,
  getLogger,
  getSession,
  setSession,
  getNotFoundFlag,
  setNotFoundFlag,
};
