import { Router } from 'express';

import { getTask, createTask, getTaskStrings } from '../controllers/task.controller';

const router = Router();

router.get('/', getTask);
router.get('/strings', getTaskStrings);
router.post('/', createTask);

export default router;
