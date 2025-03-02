const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/gallery", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// To see the images, you need to create a folder called uploads in the root of the project
// http://localhost:4000/uploads/pic-1.svg

const products = [
  {
    name: "Pic 1",
    image: "/uploads/pic-1.svg", // Relative path to the image
    description: "Strong hold",
    price: 15,
  },
  {
    name: "Pic 2",
    image: "/uploads/pic-2.svg",
    description: "Complete set",
    price: 25,
  },
  {
    name: "Pic 3",
    image: "/uploads/pic-3.svg",
    description: "Smooth experience",
    price: 17,
  },
  {
    name: "Pic 4",
    image: "/uploads/pic-4.svg",
    description: "Professional quality",
    price: 20,
  },
  {
    name: "Pic 5",
    image: "/uploads/pic-5.svg",
    description: "Handpicked premium",
    price: 55,
  },
  {
    name: "Pic 6",
    image: "/uploads/react.svg", // Relative path to the image
    description: "Natural soft",
    price: 18,
  },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database Seeded!");
  mongoose.connection.close();
};

seedDB();
