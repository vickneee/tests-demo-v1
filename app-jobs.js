require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const jobsRouter = require("./routers/jobRouter");
const userRouter = require("./routers/userRouter");
const {unknownEndpoint, errorHandler,} = require("./middleware/customMiddleware");

// Express app
const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to db
connectDB()

// Routes for jobs and users
app.use("/api/jobs", jobsRouter);
app.use("/api/users", userRouter);

// Error handling middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
