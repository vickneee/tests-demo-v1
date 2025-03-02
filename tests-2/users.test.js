const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app-tours");
const User = require("../models/userModel");

// Create a new instance of the supertest agent
const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("should signup a new user with valid credentials", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        email: 'test@example.com',
        password: 'S5g5T7!!9et',
        phone_number: '1234567890',
        gender: 'male',
        date_of_birth: '1990-01-01',
        membership_status: 'inactive'
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");
    });

    it("should return an error with invalid credentials", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        email: 'test@example.com',
        password: 'invalid-password',
        phone_number: '1234567890',
        gender: 'male',
        date_of_birth: '1990-01-01',
        membership_status: 'inactive'
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user with valid credentials", async () => {
      // Arrange
      const userData = {
        email: "test@example.com",
        password: 'S5g5T7!!9et',
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });

    it("should return an error with invalid credentials", async () => {
      // Arrange
      const userData = {
        email: "test@example.com",
        password: "invalid-password",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
