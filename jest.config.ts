import type { Config } from 'jest';

import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({});

const config: Config = {
  ...presetConfig,
  testEnvironment: 'node',

  globalSetup: '<rootDir>/tests/utils/global-setup.ts',
  globalTeardown: "<rootDir>/tests/utils/global-teardown.ts",
  globals: {
    __TESTCONTAINER__: null, // PostgreSQL container instance
    __DATABASE__: null, // Kysely database instance
  },
  // setupFilesAfterEnv: ['<rootDir>/tests/utils/global-setup.ts'], 
};

export default config;