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

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB()

// // Home route (backend)
// app.get('/', (req, res) => {
//   res.send('<h1>Hello World from Tours!</h1>');
// });

// Serve the static files from the React app (frontend) in the dist folder
app.use(express.static('dist'))

// Routes
app.use("/api/todoTasks", todoTaskRouter);
app.use("/api/users", userRouter);
app.use("/api/tours", tourRouter);

// Path gets * all routes to index.html (frontend)
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
