import { Router } from 'express';
import { addUser } from './addUser';
import { getUser } from './getUser';
import { getUsers } from './getUsers';

const router = Router()

router.post('/', addUser)
router.get('/', getUsers)
router.get('/:id', getUser)

export default router