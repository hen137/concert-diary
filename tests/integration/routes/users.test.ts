import { describe, test, expect } from 'vitest';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { manageServer } from '#tests/utils/managers.js';
import {
  DEFAULT_CURSOR,
  DEFAULT_PAGE_LIMIT,
  isBase64,
  MAX_PAGE_LIMIT,
  MIN_PAGE_LIMIT,
} from '#tests/utils/values.utils.ts';

const { getServer, setAuthHooks } = manageServer();

describe('GET /v1/users', async () => {
  setAuthHooks();
  const route = '/v1/users';

  describe('Positive Cases', async () => {
    test('return 200 with default limit, cursor', async () => {
      const server = getServer();

      const response = await supertest(server.server)
        .get(route)
        .set('Cookie', globalThis.authHeaders.get('cookie')!)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('page');
      expect(response.body.page.limit).toBe(DEFAULT_PAGE_LIMIT);
      expect(response.body.page.cursor).toBe(DEFAULT_CURSOR);
      expect(response.body.page.next_cursor).toSatisfy(isBase64);
      expect(response.body.page.prev_cursor).toBe(DEFAULT_CURSOR);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(DEFAULT_PAGE_LIMIT);
      // expect data
    });

    test('return 200 with default limit, valid cursor', async () => {
      const server = getServer();

      const cursor = btoa(JSON.stringify({ userId: faker.string.uuid() })); // TODO: query db for valid uuid

      const response = await supertest(server.server)
        .get(route)
        .set('Cookie', globalThis.authHeaders.get('cookie')!)
        .query({ cursor })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('page');
      expect(response.body.page.limit).toBe(DEFAULT_PAGE_LIMIT);
      expect(response.body.page.cursor).toBe(cursor);
      expect(response.body.page.next_cursor).toSatisfy(isBase64);
      expect(response.body.page.prev_cursor).toSatisfy(isBase64);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(DEFAULT_PAGE_LIMIT);
      // expect data
    });

    test('return 200 with custom limit between [1, 100], default cursor', async () => {
      const server = getServer();

      const limit = faker.number.int({
        min: MIN_PAGE_LIMIT,
        max: MAX_PAGE_LIMIT,
      });

      const response = await supertest(server.server)
        .get(route)
        .set('Cookie', globalThis.authHeaders.get('cookie')!)
        .query({ limit })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('page');
      expect(response.body.page.limit).toBe(limit);
      expect(response.body.page.cursor).toBe(DEFAULT_CURSOR);
      expect(response.body.page.next_cursor).toSatisfy(isBase64);
      expect(response.body.page.prev_cursor).toBe(DEFAULT_CURSOR);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(limit);
      // expect data
    });

    test('return 200 with custom limit between [1, 100], valid cursor', async () => {
      const server = getServer();

      const limit = faker.number.int({
        min: MIN_PAGE_LIMIT,
        max: MAX_PAGE_LIMIT,
      });
      const cursor = btoa(JSON.stringify({ userId: faker.string.uuid() })); // TODO: query db for valid uuid

      const response = await supertest(server.server)
        .get(route)
        .set('Cookie', globalThis.authHeaders.get('cookie')!)
        .query({ limit, cursor })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('page');
      expect(response.body.page.limit).toBe(limit);
      expect(response.body.page.cursor).toBe(cursor);
      expect(response.body.page.next_cursor).toSatisfy(isBase64);
      expect(response.body.page.prev_cursor).toBe(isBase64);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(limit);
      // expect data
    });

    test('return 200 with custom limit outside [1, 100], default cursor', async () => {
      const server = getServer();

      const limit = faker.number.int({
        min: MAX_PAGE_LIMIT,
      });

      const response = await supertest(server.server)
        .get(route)
        .set('Cookie', globalThis.authHeaders.get('cookie')!)
        .query({ limit })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('page');
      expect(response.body.page.limit).toBe(MAX_PAGE_LIMIT);
      expect(response.body.page.cursor).toBe(DEFAULT_CURSOR);
      expect(response.body.page.next_cursor).toSatisfy(isBase64);
      expect(response.body.page.prev_cursor).toBe(DEFAULT_CURSOR);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(MAX_PAGE_LIMIT);
      // expect data
    });

    test('return 200 with custom limit outside [1, 100], valid cursor', async () => {
      const server = getServer();

      const limit = faker.number.int({
        min: MAX_PAGE_LIMIT,
      });
      const cursor = btoa(JSON.stringify({ userId: faker.string.uuid() })); // TODO: query db for valid uuid

      const response = await supertest(server.server)
        .get(route)
        .set('Cookie', globalThis.authHeaders.get('cookie')!)
        .query({ limit, cursor })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('page');
      expect(response.body.page.limit).toBe(MAX_PAGE_LIMIT);
      expect(response.body.page.cursor).toBe(cursor);
      expect(response.body.page.next_cursor).toSatisfy(isBase64);
      expect(response.body.page.prev_cursor).toBe(isBase64);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(MAX_PAGE_LIMIT);
      // expect data
    });
  });

  describe('Negative Cases', () => {
    describe('400 Bad Request Tests', () => {
      test('return 400 when cursor not valid base64', async () => {
        const server = getServer();

        const customCursor = faker.string.sample();

        const response = await supertest(server.server)
          .get(route)
          .set('Cookie', globalThis.authHeaders.get('cookie')!)
          .query({ cursor: customCursor })
          .expect(400);

        expect(response.body.message).toBe('Malformed cursor');
      });

      test('return 400 when cursor is not JSON', async () => {
        const server = getServer();

        const customCursor = btoa(faker.string.sample());

        const response = await supertest(server.server)
          .get(route)
          .set('Cookie', globalThis.authHeaders.get('cookie')!)
          .query({ cursor: customCursor })
          .expect(400);

        expect(response.body.message).toBe('Malformed cursor');
      });

      test('return 400 when cursor has no userId property', async () => {
        const server = getServer();

        const customCursor = btoa(JSON.stringify({}));

        const response = await supertest(server.server)
          .get(route)
          .set('Cookie', globalThis.authHeaders.get('cookie')!)
          .query({ cursor: customCursor })
          .expect(400);

        expect(response.body.message).toBe('Malformed cursor');
      });

      test('return 400 when limit is not an integer', async () => {
        const server = getServer();

        const customLimit = faker.number.float();

        const response = await supertest(server.server)
          .get(route)
          .set('Cookie', globalThis.authHeaders.get('cookie')!)
          .query({ limit: customLimit })
          .expect(400);

        expect(response.body.message).toBe('Malformed limit');
      });

      test('return 400 when limit is negative', async () => {
        const server = getServer();

        const customLimit = -1;

        const response = await supertest(server.server)
          .get(route)
          .set('Cookie', globalThis.authHeaders.get('cookie')!)
          .query({ limit: customLimit })
          .expect(400);

        expect(response.body.message).toBe('Malformed limit');
      });
    });

    describe('401 Unauthorized Tests', () => {
      test('return 401 when no credentials provided', async () => {
        const server = getServer();

        const response = await supertest(server.server).get(route).expect(401);

        expect(response.body.message).toBe('Unauthorized Request');
      });

      test('return 401 when bad credentials provided', async () => {
        const server = getServer();

        const response = await supertest(server.server)
          .get(route)
          .set('Cookie', faker.string.alphanumeric())
          .expect(401);

        expect(response.body.message).toBe('Unauthorized Request');
      });
    });

    describe('404 Not Found Tests', () => {
      test('return 404 when cursor encodes unknown userId', () => {});
    });
  });
});

describe('POST /v1/users/register', () => {
  describe('Positive Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('GET /v1/users/{id}', () => {
  describe('Positive Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('PUT /v1/users/{id}', () => {
  describe('Positive Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('GET /v1/users/{id}/followers', () => {
  describe('Positive Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('GET /v1/users/{id}/following', () => {
  describe('Positive Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});

describe('GET /v1/users/{id}/reviews', () => {
  describe('Positive Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Negative Cases', () => {
    test('placeholder', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
