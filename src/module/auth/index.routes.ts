import { Router } from 'express';
import { exists } from './exists';

const router = Router()

router.post('/exists', exists)

export default router