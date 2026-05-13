import { defineConfig } from 'vitest/config';

export default defineConfig({
  // resolve: {
  //   tsconfigPaths: true,
  // },
  test: {
    globalSetup: './tests/utils/global_setup.ts',
  },
});
