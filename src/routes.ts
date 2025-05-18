import { Router } from "express";
import { status } from "./utils/status";
import { BaseRoute } from "./typing";   

import versionRouter from './module/version/index.routes'
import authRouter from './module/auth/index.routes'
import productRouter from './module/product/index.routes'
import usersRouter from './module/users/index.routes'
import batchRouter from './module/batch/index.routes'
import measureRouter from './module/measure/index.routes'
import supplierRouter from './module/supplier/index.routes'
import loginRouter from './module/login/index.routes'
import movementRouter from './module/movement/index.routes'
import contactRouter from './module/contact/index.routes'
import contactTypeRouter from './module/contactType/index.routes'

const router = Router();
router.use(status);

router.use(BaseRoute.version, versionRouter);
router.use(BaseRoute.authentication, authRouter);
router.use(BaseRoute.product, productRouter);
router.use(BaseRoute.user, usersRouter);
router.use(BaseRoute.batch, batchRouter);
router.use(BaseRoute.measure, measureRouter);
router.use(BaseRoute.supplier, supplierRouter);
router.use(BaseRoute.login, loginRouter);
router.use(BaseRoute.movement, movementRouter);
router.use(BaseRoute.contact, contactRouter);
router.use(BaseRoute.contactType, contactTypeRouter);

export { router };
