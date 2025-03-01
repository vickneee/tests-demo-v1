const express = require("express");
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all tours routes
// router.use(requireAuth);

// GET all tours
router.get("/", getAllTours);

// POST a new tour
router.post("/", requireAuth, createTour);

// GET a single tour
router.get("/:id", requireAuth, getTourById);

// Patch Update a single tour
router.patch("/:id", requireAuth, updateTour);

// DELETE a single tour
router.delete("/:id", requireAuth, deleteTour);

module.exports = router;
