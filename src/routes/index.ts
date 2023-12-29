import { Router } from 'express';
import { authRouter } from './authRoutes';
import {productRouter} from './productRoutes';

export const router = Router();
//API for auth
router.use("/api", authRouter);
router.use("/api", productRouter);