import { Router, Request, Response } from 'express';
import { HomeController } from './index.controller';

const route = Router()

route.get('/', HomeController.home)

export default route