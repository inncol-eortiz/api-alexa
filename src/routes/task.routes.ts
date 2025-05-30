import { Router } from 'express';
import { 
  getTask, 
  createTask, 
  getTaskStrings, 
  getTaskById, 
  updateTask, 
  deleteTask,
  getTaskByNumber 
} from '../controllers/task.controller';

const router = Router();

router.get('/', getTask);
router.get('/strings', getTaskStrings);
router.post('/', createTask);
router.get('/number/:number', getTaskByNumber); // Nueva ruta para búsqueda por número
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;