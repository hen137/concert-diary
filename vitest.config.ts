import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: './tests/utils/global_setup.ts',
  },
});
