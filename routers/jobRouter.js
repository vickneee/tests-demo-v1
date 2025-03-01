const express = require("express");
const {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobControllers.js");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all jobs
router.get("/", getAllJobs);

// POST a job
router.post("/", requireAuth, createJob);

// GET a job by id
router.get("/:id", requireAuth, getJobById);

// PUT update a job by id
router.put("/:id", requireAuth, updateJob);

// DELETE a job by id
router.delete("/:id", requireAuth, deleteJob);

module.exports = router;
