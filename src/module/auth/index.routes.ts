import { Router } from 'express';
import { create } from './create';
import { exists } from './exists';

const router = Router()

router.post('/create', create)
router.post('/exists', exists)

export default router