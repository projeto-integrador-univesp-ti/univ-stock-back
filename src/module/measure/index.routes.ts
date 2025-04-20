import { Router } from 'express';
import { addMeasure } from './addMeasure';
import { getMeasures } from './getMeasures';

const router = Router()

router.post('/', addMeasure)
router.get('/', getMeasures)

export default router