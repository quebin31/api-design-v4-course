import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/auth/sign-up', authController.signUp);
router.post('/auth/sign-in', authController.signIn);

export default router;