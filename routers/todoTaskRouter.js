const express = require("express");
const router = express.Router();
const {
  getTodoTasks,
  addTodoTask,
  getTodoTask,
  deleteTodoTask,
  updateTodoTask,
} = require("../controllers/todoTaskController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all todoTasks routes
// router.use(requireAuth);

// GET all TodoTasks
router.get("/", requireAuth, getTodoTasks);

// POST a new TodoTask
router.post("/", requireAuth, addTodoTask);

// GET a single TodoTask
router.get("/:id", requireAuth, getTodoTask);

// Update TodoTask using PUT
router.patch("/:id", requireAuth, updateTodoTask);

// DELETE a TodoTask
router.delete("/:id", requireAuth, deleteTodoTask);

module.exports = router;
