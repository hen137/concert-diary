import { createJsWithTsPreset } from 'ts-jest';

// const tsJestTransformCfg = createJsWithTsPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  transform: {
    // ...tsJestTransformCfg,
    // '^.+\\.ts$': ['ts-jest', { /* ts-jest config goes here in Jest */ }],
    '^.+\\.ts?$': 'ts-jest',
  },
  preset: "ts-jest",
  // globalSetup: "<rootDir>/utils/global-setup.ts",
  // globalTeardown: "<rootDir>/utils/global-teardown.ts",
  globals: {
    // 'ts-jest': {
    //   tsconfig: 'tsconfig.json',
    // },
    __TESTCONTAINER__: null, // This will hold the PostgreSQL container instance
  },
  // setupFilesAfterEnv: ['<rootDir>/utils/global-setup.ts'], 
};