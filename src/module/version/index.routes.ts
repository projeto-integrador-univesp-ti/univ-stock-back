import { Router, Request, Response } from 'express';
import { home } from './home';

const router = Router()

router.get('/', home)

export default router