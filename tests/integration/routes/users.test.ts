// import { manageDatabase } from '../../utils/managers.js';

describe('GET /v1/users', () => {
  describe('Positive Cases', () => {
    test('return 200 with default limit when no cursor supplied', async () => {
      // Arrange
      // Act
      // Assert
      // expect status code to be 200
      // expect Content-Type header to be 'application/json'
      // expect body to have 'page' property
      // expect body.page.limit to be 10
      // expect body.page.cursor to be ''
      // expect body.page.next_cursor to be truthy
      // expect body.page.prev_cursor to be ''
      // expect body to have 'data' property
      // expect body.data to have length 10
      // expect data
    });

    test('return 200 with default limit and valid cursor', async () => {});

    test('return 200 with custom limit between [1, 100] when no cursor supplied', async () => {});

    test('return 200 with custom limit between [1, 100] and valid cursor', async () => {});

    test('return 200 with custom limit outside [1, 100] when no cursor supplied', async () => {});

    test('return 200 with custom limit outside [1, 100] and valid cursor', async () => {});
  });

  describe('Negative Cases', () => {
    test('return 400 when cursor not valid base64', () => {});

    test('return 400 when cursor is not JSON', () => {});

    test('return 400 when cursor has no userId property', () => {});

    test('return 400 when cursor has no createdAt property', () => {});

    test('return 404 when cursor encodes unknown userId', () => {});
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
