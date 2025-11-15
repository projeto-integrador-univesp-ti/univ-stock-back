import { Router } from 'express';
import { addBatch } from './addBatch';
import { getBatches } from './getBatches';
import { getExpiringBatches } from './getExpiringBatches';

const router = Router()

router.post('/', addBatch)
router.get('/', getBatches)
router.get('/expiring', getExpiringBatches)

export default router