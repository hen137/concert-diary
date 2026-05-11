import z from 'zod';

// Pagination Values

export const DEFAULT_CURSOR = '';
export const DEFAULT_PAGE_LIMIT = 10;
export const MIN_PAGE_LIMIT = 1;
export const MAX_PAGE_LIMIT = 100;

// Value checks

export const isBase64 = (val: string) =>
  z.base64().nonempty().safeParse(val).success;
