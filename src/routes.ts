import { Router } from "express";
import { status } from "./utils/status";
import { BaseRoute } from "./typing";   

import versionRouter from './module/version/index.routes'
import authRouter from './module/auth/index.routes'
import productRouter from './module/product/index.routes'
import usersRouter from './module/users/index.routes'

const router = Router();
router.use(status);

router.use(BaseRoute.version, versionRouter);
router.use(BaseRoute.authentication, authRouter);
router.use(BaseRoute.product, productRouter);
router.use(BaseRoute.user, usersRouter);

export { router };
