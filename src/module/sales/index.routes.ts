import { Router } from 'express';
import { addSale } from './addSale';

const router = Router()

router.post('/', addSale)

export default router