require('dotenv').config();
const express = require('express');
const userRouter = require("./routers/userRouter");
const workoutRouter = require("./routers/workoutRouter");
const {unknownEndpoint, errorHandler} = require('./middleware/customMiddleware');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const cors = require('cors');

// Express app
const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  logger.info(req.path, req.method);
  next();
});

// // Serve the static files from the React app (frontend) in the dist folder
// app.use(express.static('dist'))

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to db
connectDB();

// Home route (backend)
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Routes
app.use('/api/workouts', workoutRouter);
app.use('/api/user', userRouter);

// // Path gets * all routes to index.html (frontend)
// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html');
// });

// Error handling middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
