const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app-tours"); // Your Express app
const TodoTask = require("../models/todoTaskModel");
const User = require("../models/userModel");

// Create a new instance of the supertest agent
const api = supertest(app);

const todoTasks = [
  {
    title: "Sample title 1",
    description: "Sample description 1",
    dueDate: "2025-02-13",
    completed: false,
  },
  {
    title: "Sample title 2",
    description: "Sample description 2",
    dueDate: "2025-03-01",
    completed: false,
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
  .post("/api/users/signup")
  .send({
    name: "John Doe",
    email: "test@example.com",
    password: "S5g5T7!et",
    phone_number: '1234567890',
    gender: 'male',
    date_of_birth: '1990-01-01',
    membership_status: 'inactive'
  });
  token = result.body.token;
});

describe("Given there are initially some todoTasks saved", () => {
  beforeEach(async () => {
    await TodoTask.deleteMany({});
    await Promise.all([
      api.post("/api/todoTasks").set("Authorization", "bearer " + token).send(todoTasks[0]),
      api.post("/api/todoTasks").set("Authorization", "bearer " + token).send(todoTasks[1])
    ]);
  });

  it("should return all todoTasks as JSON when GET /api/todoTasks is called", async () => {
    await api
      .get("/api/todoTasks")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one todoTask when POST /api/todoTasks is called", async () => {
    const newTodoTask = {
      title: "test title",
      description: "test description",
      dueDate: new Date(), // Changed from targetDate to dueDate
      completed: false,
    };
    await api
      .post("/api/todoTasks")
      .set("Authorization", "bearer " + token)
      .send(newTodoTask)
      .expect(201);
  });

  it("should return one todoTask by ID when GET /api/todoTasks/:id is called", async () => {
    const todoTask = await TodoTask.findOne();
    await api
      .get("/api/todoTasks/" + todoTask._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one todoTask by ID when PUT /api/todoTasks/:id is called", async () => {
    const todoTask = await TodoTask.findOne();
    const updatedTodoTask = {
      title: "test title",
      description: "test description",
      dueDate: new Date(), // Changed from targetDate to dueDate
      completed: false,
    };
    await api
      .patch("/api/todoTasks/" + todoTask._id)
      .set("Authorization", "bearer " + token)
      .send(updatedTodoTask)
      .expect(200);
    const updatedTodoTaskCheck = await TodoTask.findById(todoTask._id);
    expect(updatedTodoTaskCheck.toJSON()).toEqual(
      expect.objectContaining(updatedTodoTask)
    );
  });

  it("should delete one todoTask by ID when DELETE /api/todoTasks/:id is called", async () => {
    const todoTask = await TodoTask.findOne();
    await api
      .delete("/api/todoTasks/" + todoTask._id) // Corrected endpoint
      .set("Authorization", "bearer " + token)
      .expect(204);
    const todoTaskCheck = await TodoTask.findById(todoTask._id);
    expect(todoTaskCheck).toBeNull();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
