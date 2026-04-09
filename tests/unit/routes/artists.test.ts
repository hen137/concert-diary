import { manageServer, manageDatabase } from "../../utils/managers.js";

// TODO: Implement tests

describe("Artist Route Tests", () => {
    const { getServer } = manageServer();
    const { getDb } = manageDatabase();

  describe("/artists", () => {
    describe("GET", () => {
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
});
