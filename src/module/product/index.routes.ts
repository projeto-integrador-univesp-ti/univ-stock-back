import { Router } from 'express';
import { addProduct } from './addProduct';
import { decreaseProduct } from "./decreaseProduct";
import { deleteProduct } from './deleteProduct';
import { getProduct } from './getProduct';
import { getProducts } from './getProducts';
import { updateProduct } from './updateProduct';


const router = Router()

router.post('/', addProduct)
router.get('/', getProducts)
router.get('/:code', getProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)
router.patch("/decrease", decreaseProduct)


export default router