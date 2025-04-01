import { Router, Request, Response } from 'express';
import { UsersController } from './index.controller';

const route = Router()

route.get('/create', UsersController.getUsers)

export default route