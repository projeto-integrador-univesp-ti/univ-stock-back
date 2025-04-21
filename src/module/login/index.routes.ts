import { Router } from 'express';
import { addLogin } from './addLogin';
import { getLogins } from './getLogins';

const router = Router()

router.post('/', addLogin)
router.get('/', getLogins)

export default router