import { Router } from 'express';
import { addProduct } from './addProduct';
import { getProducts } from './getProducts';
import { deleteProduct } from './deleteProduct';
import { updateProduct } from './updateProduct';

const router = Router()

router.post('/', addProduct)
router.get('/', getProducts)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)

export default router