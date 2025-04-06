import { Router } from 'express';
import { getUser } from './getUser';
import { getUsers } from './getUsers';

const route = Router()

// route.post('/', getUsers)
route.post('/', getUser)

export default route