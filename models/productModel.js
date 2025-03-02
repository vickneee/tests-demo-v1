const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String, // URL or path to the image
  description: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
