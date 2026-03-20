import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createTaskSchema, updateTaskSchema } from '../utils/taskValidators.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', validateRequest(createTaskSchema), createTask);
router.get('/', getTasks);
router.put('/:id', validateRequest(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
