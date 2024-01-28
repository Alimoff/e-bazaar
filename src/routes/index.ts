import { Router } from 'express';
import { authRouter } from './authRoutes';
import {productRouter} from './productRoutes';
import {categoryRouter} from './categoryRoutes';

export const router = Router();
//API for auth
router.use("/api", authRouter);
router.use("/api", productRouter);
router.use("/api", categoryRouter);