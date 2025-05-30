import { Router } from 'express';
import { 
  getTask, 
  createTask, 
  getTaskStrings, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/task.controller';

const router = Router();

router.get('/', getTask);
router.get('/strings', getTaskStrings);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
