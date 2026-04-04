import type { FastifyBaseLogger } from "fastify";
import type { Session, User } from "better-auth";
import { AsyncLocalStorage } from "async_hooks";

type AuthSession = { session: Session; user: User }

export type IAsyncStore = {
  logger: FastifyBaseLogger;
  session?: AuthSession;
};

const asyncStore = new AsyncLocalStorage<IAsyncStore>();

// Provide a safe method to get the logger
const getLogger = (): FastifyBaseLogger => {
  const store = asyncStore.getStore();

  if (!store) {
    throw new Error("Logger could not be found in the current async context.");
  }
  return store.logger;
};

const getSession = (): AuthSession => {
  const store = asyncStore.getStore();

  if (!store) {
    throw new Error("Session could not be found in the current async context.");
  }
  return store.session!;
};

const setSession = (sessionData: AuthSession) => {
  const store = asyncStore.getStore();
  if (!store) {
    throw new Error("Session could not be found in the current async context.");
  }
  store.session = sessionData;
};

export const ALS = {
  asyncStore,
  getLogger,
  getSession,
  setSession,
};
