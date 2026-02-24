import type { Config } from 'jest';

import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({});

const config: Config = {
  ...presetConfig,
  testEnvironment: 'node',

  globalSetup: '<rootDir>/tests/utils/global-setup.ts',
   globalTeardown: "<rootDir>/tests/utils/global-teardown.ts",
  globals: {
    // 'ts-jest': {
    //   tsconfig: 'tsconfig.json',
    // },
    __TESTCONTAINER__: null, // This will hold the PostgreSQL container instance
  },
  // setupFilesAfterEnv: ['<rootDir>/tests/utils/global-setup.ts'], 
};

export default config;