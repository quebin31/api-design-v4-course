import { Request, Response } from 'express';
import * as updatesService from '../services/updates.service';
import { ProductWithUpdates } from '../services/updates.service';
import { Update } from '@prisma/client';
import { NotFoundError } from '../errors';

export interface UpdatesByProduct {
    [productId: string]: Update[];
}

function mapToUpdatesByProduct(products: ProductWithUpdates[]): UpdatesByProduct {
    const result: UpdatesByProduct = {};
    for (const product of products) {
        result[product.id] = product.updates;
    }

    return result;
}

export async function getUpdates(req: Request, res: Response) {
    const userId = req.userId!!;
    const productsWithUpdates = await updatesService.getUserUpdates(userId);
    if (!productsWithUpdates) {
        throw new NotFoundError('No updates were found');
    } else {
        res.json(mapToUpdatesByProduct(productsWithUpdates));
    }
}

export async function getUpdate(req: Request, res: Response) {
    const updateId = req.params.id;
    const userId = req.userId!!;
    const update = await updatesService.getUpdate(updateId, userId);
    if (!update) {
        throw new NotFoundError('No update was found');
    } else {
        res.json(update);
    }
}

export async function createUpdate(req: Request, res: Response) {
    const userId = req.userId!!;
    const update = await updatesService.createUpdate(userId, req.body);
    res.json(update);
}

export async function updateUpdate(req: Request, res: Response) {
    const userId = req.userId!!;
    const updateId = req.params.id;
    const updated = await updatesService.updateUpdate(updateId, userId, req.body);
    if (!updated) {
        throw new NotFoundError('No update was found');
    } else {
        res.json(updated);
    }
}

export async function deleteUpdate(req: Request, res: Response) {
    const userId = req.userId!!;
    const updateId = req.params.id;
    const result = await updatesService.deleteUpdate(updateId, userId);
    if (result.count === 0) {
        throw new NotFoundError('No update was found');
    } else {
        res.sendStatus(200);
    }
}