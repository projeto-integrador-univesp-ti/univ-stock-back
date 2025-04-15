import { Router } from 'express';
import { addProduct } from './addProduct';
import { getProducts } from './getProducts';

const router = Router()

router.post('/', addProduct)
router.get('/', getProducts)

export default router