import { Router } from 'express';
import {productRouter} from './productRoutes';
import { customerRouter } from './customerRoutes';
import { shoppingRouter } from './shoppingRepo';

export const router = Router();
//API for auth
router.use("/api", productRouter);
router.use("/api", customerRouter);
router.use("/api", shoppingRouter);