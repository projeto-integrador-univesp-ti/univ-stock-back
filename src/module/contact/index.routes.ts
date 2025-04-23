import { Router } from 'express';
import { addContact } from './addContact';
import { getContacts } from './getContacts';

const router = Router()

router.post('/', addContact)
router.get('/', getContacts)

export default router