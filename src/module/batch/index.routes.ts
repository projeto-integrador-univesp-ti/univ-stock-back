import { Router } from 'express';
import { addBatch } from './addBatch';

import { getBatches } from './getBatches';

const router = Router()

router.post('/', addBatch)
router.get('/', getBatches)

export default router