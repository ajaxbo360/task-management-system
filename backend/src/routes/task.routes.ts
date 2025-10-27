import express from "express";
import {
   getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller';

import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect);


//GET /api/tasks - Get all tasks (with filtering)
// POST /api/tasks - Create new task
router.route('/')
  .get(getTasks)
  .post(createTask);

// GET /api/tasks/:id - Get single task
// PUT /api/tasks/:id - Update task
// DELETE /api/tasks/:id - Delete task
router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

export default router;