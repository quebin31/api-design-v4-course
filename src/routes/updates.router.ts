import { validateWithSchema } from '../schemas/middleware';
import { optionalUpdateSchema, requiredUpdateSchema } from '../schemas/updates';
import { Router } from 'express';

const router = Router();

router.get('/updates', () => {
});

router.get('/updates/:id', () => {
});

router.put('/updates/:id', validateWithSchema(optionalUpdateSchema), () => {
});

router.post('/updates/', validateWithSchema(requiredUpdateSchema), () => {
});

router.delete('/updates/:id', () => {

});

export default router;