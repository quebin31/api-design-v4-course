import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import asyncHandler from 'express-async-handler';

const router = Router();

router.post('/auth/sign-up', asyncHandler(authController.signUp));
router.post('/auth/sign-in', asyncHandler(authController.signIn));

export default router;