import { Router } from 'express';
import { addMovement } from './addMovement';
import { getMovements } from './getMovements';

const router = Router()

router.post('/', addMovement)
router.get('/', getMovements)

export default router