require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const todoTaskRouter = require("./routers/todoTaskRouter");
const userRouter = require("./routers/userRouter");
const tourRouter = require("./routers/tourRouter");
const {unknownEndpoint, errorHandler,} = require("./middleware/customMiddleware");

// Express app
const app = express();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

connectDB()

app.use("/api/todoTasks", todoTaskRouter);
app.use("/api/users", userRouter);
app.use("/api/tours", tourRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
