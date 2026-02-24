import type { Config } from 'jest';

const config: Config = {
  // ... other Jest configurations
  // A global setup script that runs once before all tests
  globalSetup: '<rootDir>/tests/global-setup.ts',
  // A global teardown script that runs once after all tests
  globalTeardown: '<rootDir>/tests/global-teardown.ts',
};

export default config;