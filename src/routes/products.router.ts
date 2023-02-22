import { validateWithSchema } from '../schemas/middleware';
import { optionalProductSchema, requiredProductSchema } from '../schemas/products';
import { Router } from 'express';

const router = Router();

router.get('/products', (req, res) => {
    res.json({ message: 'hello' });
});

router.get('/products/:id', () => {
});

router.put('/products/:id', validateWithSchema(optionalProductSchema), () => {
});

router.post('/products/', validateWithSchema(requiredProductSchema), (req, res) => {
});

router.delete('/products/:id', () => {

});


export default router;