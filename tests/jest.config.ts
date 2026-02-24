import type { Config } from 'jest';

const config: Config = {
  // ... other Jest configurations
  // A global setup script that runs once before all tests
  globalSetup: '<rootDir>/utils/global-setup.ts',
  // A global teardown script that runs once after all tests
  globalTeardown: '<rootDir>/utils/global-teardown.ts',
};

export default config;