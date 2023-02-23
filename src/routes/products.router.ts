import { validateWithSchema } from '../schemas/middleware';
import { optionalProductSchema, requiredProductSchema } from '../schemas/products';
import { Router } from 'express';
import * as productsController from '../controllers/products.controller';
import asyncHandler from 'express-async-handler';

const router = Router();

const validatePost = validateWithSchema(requiredProductSchema);
const validatePut = validateWithSchema(optionalProductSchema);

router.get('/products', asyncHandler(productsController.getProducts));
router.get('/products/:id', asyncHandler(productsController.getProduct));
router.post('/products/', validatePost, asyncHandler(productsController.createProduct));
router.put('/products/:id', validatePut, asyncHandler(productsController.updateProduct));
router.delete('/products/:id', asyncHandler(productsController.deleteProduct));

export default router;