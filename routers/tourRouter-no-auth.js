const express = require("express");
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers-no-auth");

const router = express.Router();

// GET all tours
router.get("/", getAllTours);

// POST a new tour
router.post("/", createTour);

// GET a single tour
router.get("/:id", getTourById);

// Patch Update a single tour
router.patch("/:id", updateTour);

// DELETE a single tour
router.delete("/:id", deleteTour);

module.exports = router;
