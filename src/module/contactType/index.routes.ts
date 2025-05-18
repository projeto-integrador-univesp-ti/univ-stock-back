import { Router } from 'express';
import { addContactType } from './addContactType';
import { getContactsTypes } from './getContactsTypes';

const router = Router()

router.post('/', addContactType)
router.get('/', getContactsTypes)

export default router