import { describe, test, expect } from 'vitest';
import z from 'zod';
import { faker } from '@faker-js/faker';
import {
  formatUsersPayload,
  validateCursorLimit,
} from '../../../src/utils/pagination.utils.js';

const DEFAULT_CURSOR = '';
const DEFAULT_LIMIT = 10;
const MIN_LIMIT = 1;
const MAX_LIMIT = 100;

const CURSOR_SCHEMA = z.object({
  id: z.uuid(),
  createdAt: z.string().transform((val) => new Date(val)),
});

describe('validateCursorLimit', () => {
  describe('Positive Cases', () => {
    test('return default cursor, limit when supplied default cursor, limit', () => {
      const { cursor, limit } = validateCursorLimit(
        DEFAULT_CURSOR,
        DEFAULT_LIMIT,
        CURSOR_SCHEMA
      );

      expect(cursor).toEqual(DEFAULT_CURSOR);
      expect(limit).toEqual(DEFAULT_LIMIT);
    });

    test('return default cursor, custom limit when supplied empty cursor, custom limit [1, 100]', () => {
      const customLimit = 30;

      const { cursor, limit } = validateCursorLimit(
        DEFAULT_CURSOR,
        customLimit,
        CURSOR_SCHEMA
      );

      expect(cursor).toBe(DEFAULT_CURSOR);
      expect(limit).toEqual(customLimit);
    });

    test('return decoded cursor, default limit when supplied custom cursor, default limit', () => {
      const customCursor = btoa(
        JSON.stringify({
          id: faker.string.uuid(),
          createdAt: faker.date.anytime(),
        })
      );

      const { cursor, limit } = validateCursorLimit(
        customCursor,
        DEFAULT_LIMIT,
        CURSOR_SCHEMA
      );

      expect(cursor).toHaveProperty('id');
      expect(cursor).toHaveProperty('createdAt');
      expect(limit).toEqual(DEFAULT_LIMIT);
    });

    test('return decoded cursor, default limit when supplied custom cursor with eroneous fields, default limit', () => {
      const minCursor = {
        id: faker.string.uuid(),
        createdAt: faker.date.anytime(),
      };

      const customCursor = btoa(
        JSON.stringify({
          ...minCursor,
          field1: faker.string.alpha(),
          field2: faker.number.float(),
        })
      );

      const { cursor, limit } = validateCursorLimit(
        customCursor,
        DEFAULT_LIMIT,
        CURSOR_SCHEMA
      );

      //   expect(cursor).toHaveProperty('id');
      //   expect(cursor).toHaveProperty('createdAt');
      expect(cursor).toStrictEqual(minCursor);
      expect(limit).toEqual(DEFAULT_LIMIT);
    });

    test('return default cursor, max limit when supplied empty cursor, limit > 100', () => {
      const customLimit = 250;

      const { cursor, limit } = validateCursorLimit(
        DEFAULT_CURSOR,
        customLimit,
        CURSOR_SCHEMA
      );

      expect(cursor).toEqual(DEFAULT_CURSOR);
      expect(limit).toEqual(MAX_LIMIT);
    });

    test('return default cursor, min limit when supplied empty cursor, limit < 1', () => {
      const customLimit = -10;

      const { cursor, limit } = validateCursorLimit(
        DEFAULT_CURSOR,
        customLimit,
        CURSOR_SCHEMA
      );

      expect(cursor).toEqual(DEFAULT_CURSOR);
      expect(limit).toEqual(MIN_LIMIT);
    });
  });

  describe('Negative Cases', () => {
    test("throw DOMException error when encoded cursor isn't valid base64", () => {
      // TODO: append not base64 char to ensure error every time
      const customCursor = faker.string.sample();

      expect(() => {
        validateCursorLimit(customCursor, DEFAULT_LIMIT, CURSOR_SCHEMA);
      }).toThrow(DOMException);
    });

    test("throw SyntaxError error when decoded cursor isn't a JSON string", () => {
      const customCursor = btoa(faker.string.sample());

      expect(() => {
        validateCursorLimit(customCursor, DEFAULT_LIMIT, CURSOR_SCHEMA);
      }).toThrow(SyntaxError);
    });

    test("throw ZodError error when decoded cursor doesn't obey cursor schema", () => {
      const customCursor = btoa(
        JSON.stringify({
          id: faker.string.uuid(),
          //   createdAt: faker.date.anytime(),
        })
      );

      expect(() => {
        validateCursorLimit(customCursor, DEFAULT_LIMIT, CURSOR_SCHEMA);
      }).toThrow(z.ZodError);
    });
  });
});

describe('formatUsersPayload', () => {
  describe('Positive Cases', () => {
    test('return paginated users payload when supplied default cursor, limit, random account data', () => {
      const randAccData = [];
      for (let i = 0; i < DEFAULT_LIMIT; i++) {
        const user_id = faker.string.uuid();
        randAccData.push({
          user_id,
          username: faker.internet.username(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          avatar_url: faker.internet.domainName(),
          created_at: faker.date.anytime(),
        });
      }
      const randPrevAccData: { user_id: string; created_at: Date }[] = [];
      for (let i = 0; i < DEFAULT_LIMIT; i++) {
        randPrevAccData.push({
          user_id: faker.string.uuid(),
          created_at: faker.date.anytime(),
        });
      }

      const payload = formatUsersPayload(
        DEFAULT_CURSOR,
        DEFAULT_LIMIT,
        randAccData,
        randPrevAccData
      );

      // expect(payload.page)
      expect(payload.data).toHaveLength(DEFAULT_LIMIT);
    });
  });

  describe('Negative Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('formatVenuesPayload', () => {
  describe('Positive Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('formatEventsPayload', () => {
  describe('Positive Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('formatSeriesPayload', () => {
  describe('Positive Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('formatArtistPayload', () => {
  describe('Positive Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('formatReviewsPayload', () => {
  describe('Positive Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
