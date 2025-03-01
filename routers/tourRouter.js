const express = require("express");
const router = express.Router();
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");
const requireAuth = require("../middleware/requireAuth");

// GET all tours
router.get("/", getAllTours);

// POST a new tour
router.post("/", requireAuth, createTour);

// GET a single tour
router.get("/:tourId", requireAuth, getTourById);

// Patch Update a single tour
router.patch("/:tourId", requireAuth, updateTour);

// DELETE a single tour
router.delete("/:tourId", requireAuth, deleteTour);

module.exports = router;
