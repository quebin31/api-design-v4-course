import { Request, Response } from 'express';
import * as productsService from '../services/products.service';
import { Product } from '@prisma/client';

type ResponseProduct = Omit<Product, 'belongsToId'> & {
    userId: string, belongsToId: undefined
}

function productToResponseProduct(product: Product): ResponseProduct {
    return {
        ...product, userId: product.belongsToId, belongsToId: undefined,
    };
}

export async function getProducts(req: Request, res: Response) {
    const userId = req.userId!!;
    const products = await productsService.getUserProducts(userId);
    if (!products) {
        res.status(404).json({ error: 'No products were found' });
    } else {
        res.json(products.map(productToResponseProduct));
    }
}

export async function getProduct(req: Request, res: Response) {
    const userId = req.userId!!;
    const productId = req.params.id;
    const product = await productsService.getProduct(productId, userId);
    if (!product) {
        res.status(404).json({ error: 'No product was found' });
    } else {
        res.json(productToResponseProduct(product));
    }
}

export async function createProduct(req: Request, res: Response) {
    const userId = req.userId!!;
    const product = await productsService.createProduct(userId, req.body);
    res.json(productToResponseProduct(product));
}

export async function updateProduct(req: Request, res: Response) {
    const userId = req.userId!!;
    const productId = req.params.id;
    const updated = await productsService.updateProduct(productId, userId, req.body);
    if (!updated) {
        res.status(404).json({ error: 'No product was found' });
    } else {
        res.json(productToResponseProduct(updated));
    }

}

export async function deleteProduct(req: Request, res: Response) {
    const userId = req.userId!!;
    const productId = req.params.id;
    const result = await productsService.deleteProduct(productId, userId);
    if (result.count === 0) {
        res.status(404).json({ error: 'No product was found' });
    } else {
        res.sendStatus(200);
    }
}