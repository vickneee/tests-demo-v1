const express = require('express')
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// // Require auth for all workout routes
// router.use(requireAuth)

// GET all workouts
router.get('/', requireAuth, getWorkouts)

// POST a new workout
router.post('/', requireAuth, createWorkout)

// GET a single workout
router.get('/:id', requireAuth, getWorkout)

// UPDATE a workout
router.patch('/:id', requireAuth, updateWorkout)

// DELETE a workout
router.delete('/:id', requireAuth, deleteWorkout)

module.exports = router
