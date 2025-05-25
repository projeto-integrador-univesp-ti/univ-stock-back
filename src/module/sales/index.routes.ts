import { Router } from 'express';
import { addSale } from './addSale';
import { getSale } from './getSale';

const router = Router()

router.get('/:id', getSale)
router.post('/', addSale)

export default router