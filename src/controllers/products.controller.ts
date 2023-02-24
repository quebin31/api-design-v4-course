import { Request, Response } from 'express';
import * as productsService from '../services/products.service';
import { Product } from '@prisma/client';
import { NotFoundError } from '../errors';

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
        throw new NotFoundError('No products were found');
    } else {
        res.json(products.map(productToResponseProduct));
    }
}

export async function getProduct(req: Request, res: Response) {
    const userId = req.userId!!;
    const productId = req.params.id;
    const product = await productsService.getProduct(productId, userId);
    if (!product) {
        throw new NotFoundError('No product was found');
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
        throw new NotFoundError('No product was found');
    } else {
        res.json(productToResponseProduct(updated));
    }

}

export async function deleteProduct(req: Request, res: Response) {
    const userId = req.userId!!;
    const productId = req.params.id;
    const result = await productsService.deleteProduct(productId, userId);
    if (result.count === 0) {
        throw new NotFoundError('No product was found');
    } else {
        res.sendStatus(200);
    }
}