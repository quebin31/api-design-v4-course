import { validateWithSchema } from '../schemas/middleware';
import { optionalUpdateSchema, requiredUpdateSchema } from '../schemas/updates';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as updatesController from '../controllers/updates.controller';

const router = Router();

const validatePost = validateWithSchema(requiredUpdateSchema);
const validatePut = validateWithSchema(optionalUpdateSchema);

router.get('/updates', asyncHandler(updatesController.getUpdates));
router.get('/updates/:id', asyncHandler(updatesController.getUpdate));
router.post('/updates/', validatePost, asyncHandler(updatesController.createUpdate));
router.put('/updates/:id', validatePut, asyncHandler(updatesController.updateUpdate));
router.delete('/updates/:id', asyncHandler(updatesController.deleteUpdate));

export default router;