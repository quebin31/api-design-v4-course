import { Router } from 'express';
import * as authHandlers from '../handlers/auth.handlers';

const router = Router();

router.post('/auth/sign-up', authHandlers.signUp);
router.post('/auth/sign-in', authHandlers.signIn);

export default router;