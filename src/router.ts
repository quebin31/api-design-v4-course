import { Router } from 'express';
import authRouter from './routes/auth.router';
import { authMiddleware } from './modules/auth';
import productsRouter from './routes/products.router';
import updatesRouter from './routes/updates.router';
import updatePointsRouter from './routes/update-points.router';

const router = Router();

router.use('/', authRouter);
router.use('/', authMiddleware, productsRouter);
router.use('/', authMiddleware, updatesRouter);
router.use('/', authMiddleware, updatePointsRouter);

export default router;