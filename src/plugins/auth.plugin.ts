// CONSIDER: https://github.com/flaviodelgrosso/fastify-better-auth

import type { IncomingHttpHeaders } from 'node:http';
import type { FastifyAuthPluginOptions } from '@fastify/auth';
import type { Auth, BetterAuthOptions } from 'better-auth';
import type { Server } from '../index.js';

import fp from 'fastify-plugin';
import auth from '@fastify/auth';
import { betterAuth } from 'better-auth';
import { openAPI, username, bearer, testUtils } from 'better-auth/plugins';
import { fromNodeHeaders } from 'better-auth/node';
import { apiKey } from '@better-auth/api-key';
import { session } from '../utils/session.utils.js';
import { logger } from '../utils/logger.utils.js';
import { UnauthorizedError } from '../utils/errors.util.js';

declare module 'fastify' {
  interface FastifyInstance {
    betterAuth: Auth<BetterAuthOptions>;
    authenticateHeaders: (headers: IncomingHttpHeaders) => Promise<void>;
    authenticateAPIKey: (apiKey: string) => Promise<void>;
  }
}

interface IAuthPluginOptions {
  fastifyAuthOpts: FastifyAuthPluginOptions;
  betterAuthOpts: BetterAuthOptions;
}

const devConfig = {
  fastifyAuthOpts: {},
  betterAuthOpts: {
    basePath: '/v1/auth',
    trustedOrigins: ['http://localhost:3000'],
    // TODO: setup logger in auth contexts
    plugins: [
      openAPI({
        // TODO: needs to be unified on /docs
        path: '/docs', // gets served on /v1/auth/docs
      }),
      username(),
      // TODO: add options when supported
      bearer({ requireSignature: true }),
      apiKey([
        // FIX: causing ts issues
        // https://better-auth.com/docs/plugins/api-key/reference#creating-api-keys-with-permissions
        {
          configId: 'public',
          defaultPrefix: 'pk_',
          // TODO: add rate limits
          // permissions: {
          //   defaultPermissions(referenceId, ctx) {
          //     return {};
          //   },
          // },
        },
        // {
        //   configId: 'secret',
        //   defaultPrefix: 'sk_',
        // },
      ]),
    ],
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        // TODO: get google credentials
        // https://better-auth.com/docs/authentication/google
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        prompt: 'select_account',
      },
      // TODO: get apple credentials
      // https://better-auth.com/docs/authentication/apple
      // mainaints development restictions that require additional setup
      // apple: {},
      discord: {
        // TODO: get discord credentials
        // https://better-auth.com/docs/authentication/discord
        clientId: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      },
    },
  },
};

const testConfig = {
  fastifyAuthOpts: {},
  betterAuthOpts: {
    basePath: '/v1/auth',
    trustedOrigins: ['http://localhost:3000'],
    plugins: [testUtils()],
  },
};

// export function buildAuth(betterAuthOpts: BetterAuthOptions) {
//   return betterAuth(betterAuthOpts);
// }

async function authPlugin(server: Server, options: IAuthPluginOptions) {
  server.register(auth, options.fastifyAuthOpts);

  // server.decorate('betterAuth', buildAuth(options.betterAuthOpts));
  server.decorate('betterAuth', betterAuth(options.betterAuthOpts));

  server.decorate(
    'authenticateHeaders',
    async (headers: IncomingHttpHeaders) => {
      const sesh = await server.betterAuth.api.getSession({
        headers: fromNodeHeaders(headers),
      });

      if (!sesh) throw new UnauthorizedError('Unauthorized Request');

      session.setSession(sesh);

      logger.debug(
        { session: sesh },
        'Authenticated and session set in context'
      );
    }
  );

  server.decorate('authenticateAPIKey', async (apiKey: string) => {
    if (!apiKey) throw new UnauthorizedError('No API key provided');

    const result = await server.betterAuth.api.verifyApiKey({
      body: {
        configId: 'public',
        key: apiKey,
        // permissions: {
        //   // TODO: implement expected permission checks
        // },
      },
    });

    // TODO: create custom error handling for unauthorized requests
    if (!result.valid) throw new UnauthorizedError('Invalid API Key');
  });

  server.log.debug('Auth plugin registered successfully');
}

export default fp(authPlugin, {
  name: 'auth',
});

// TODO: make this cleaner
export const autoConfig =
  process.env.NODE_ENV === 'test' ? testConfig : devConfig;
