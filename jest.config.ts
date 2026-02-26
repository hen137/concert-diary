import type { Config } from 'jest';

import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({});

const config: Config = {
  ...presetConfig,
  testEnvironment: 'node',

  globalSetup: '<rootDir>/tests/utils/global-setup.ts',
  globalTeardown: "<rootDir>/tests/utils/global-teardown.ts",
  modulePaths: ['<rootDir>/src/', '<rootDir>/tests/'],
  // moduleDirectories: ['node_modules', '<rootDir>/src/', '<rootDir>/tests/'],
};

export default config;