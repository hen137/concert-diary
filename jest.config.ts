export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  // roots: ["<rootDir>", "<rootDir>/db_seed", "<rootDir>/src"],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // globalSetup: "<rootDir>/tests/utils/global-setup.ts",
  // globalTeardown: "<rootDir>/tests/utils/global-teardown.ts",
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/handlers',
    '<rootDir>/src/schemas',
    '<rootDir>/src/routes/tests',
  ],
  collectCoverageFrom: ['src/**/*.ts'],
  // moduleDirectories: ["node_modules", "db_seed", "src"],
  // modulePaths: ["<rootDir>", "<rootDir>/db_seed", "<rootDir>/src"],
};
