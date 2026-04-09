import supertest from "supertest";
import { manageServer, manageDatabase } from "../../utils/managers.js";

// TODO: Implement tests

type PaginationResponse = {
  page: object;
  data: object;
};

describe("User Route Tests", () => {
  const { getServer } = manageServer();
  const { getDb } = manageDatabase();

  describe("/users", () => {
    describe("GET", () => {
      describe("Positive Cases", () => {
        test("Cursor Pagination: default cursor and limit", async () => {
          // Arrange
          const server = getServer();
          const db = getDb();

          // populate db with relavent data

          // Act
          const resp = await supertest(server.server)
            .get("/v1/users")
            // .set('Authentication', `Bearer ${process.env.SERVER_AUTH}`)
            .expect(200);
          console.log(resp);

          // Assert
          expect(resp.body).toMatchObject({ page: {}, data: {} });
        });

        test("Cursor Pagination: ", () => {
          const server = getServer();
          const db = getDb();

          // fill db with data

          // mock request w/ supertest

          // assert success
          expect(true).toBeTruthy();
        });
      });

      describe("Negative Cases", () => {
        test("placeholder", () => {
          // Arrange
          const server = getServer();
          const db = getDb();

          // Act

          // Assert
        });
      });
    });
  });

  describe("/users/register", () => {
    describe("POST", () => {
      describe("Positive Cases", () => {
        test("placeholder", () => {
          // Arrange
          const server = getServer();
          const db = getDb();

          // Act

          // Assert
        });
      });

      describe("Negative Cases", () => {
        test("placeholder", () => {
          // Arrange
          const server = getServer();
          const db = getDb();

          // Act

          // Assert
        });
      });
    });
  });

  describe("/users/:id", () => {
    describe("GET", () => {
      describe("Positive Cases", () => {
        //tests
      });

      describe("Negative Cases", () => {
        //tests
      });
    });

    describe("PUT", () => {
      describe("Positive Cases", () => {
        //tests
      });

      describe("Negative Cases", () => {
        //tests
      });
    });
  });

  describe("/users/:id/followers", () => {
    describe("GET", () => {
      describe("Positive Cases", () => {
        //tests
      });

      describe("Negative Cases", () => {
        //tests
      });
    });
  });

  describe("/users/:id/following", () => {
    describe("GET", () => {
      describe("Positive Cases", () => {
        //tests
      });

      describe("Negative Cases", () => {
        //tests
      });
    });
  });
});
