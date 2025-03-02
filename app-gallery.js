require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const fs = require("fs"); // File system module
const path = require("path"); // Path module
const productRouter = require("./routers/productRouter");
const {unknownEndpoint, errorHandler,} = require("./middleware/customMiddleware");

// Express app
const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to db
connectDB()

// Serve images statically
app.use("/uploads", express.static("public/uploads"));

// Home route (backend)
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Route to display all images
app.get("/gallery", (req, res) => {
  const uploadsDir = path.join(__dirname, "public/uploads");
  
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading directory");
    }
    
    let imageHTML = files
    .map(
      (file) =>
        `<img src="/uploads/${file}" alt="${file}" style="width:200px; margin:10px;">`
    )
    .join("");
    
    res.send(`<h1>Image Gallery</h1>${imageHTML}`);
  });
});

// Routes
app.use("/api/products", productRouter);

// Error handling middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
