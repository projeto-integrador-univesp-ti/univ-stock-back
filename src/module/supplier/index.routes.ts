import { Router } from 'express';
import { addSupplier } from './addSupplier';
import { getSuppliers } from './getSuppliers';

const router = Router()

router.post('/', addSupplier)
router.get('/', getSuppliers)

export default router