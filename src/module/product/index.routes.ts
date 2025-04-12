import { Router } from 'express';
import { addProduct } from './addProduct';

const router = Router()

router.post('/', addProduct)

export default router