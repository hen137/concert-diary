/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx}': ['pnpm lint:fix', 'pnpm format:file'],
  '*.{json,md,mdx,css,scss,html,yml,yaml}': 'pnpm format:file',
}
