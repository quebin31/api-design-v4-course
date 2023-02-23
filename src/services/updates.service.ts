import database from '../database';
import prisma from '../database';
import { Product, Update } from '@prisma/client';

export type ProductWithUpdates = Product & { updates: Update[] }

export async function getUserUpdates(userId: string): Promise<ProductWithUpdates[] | undefined> {
    return database.product.findMany({
        where: {
            belongsToId: userId,
        },
        include: {
            updates: { orderBy: { createdAt: 'desc' } },
        },
    });
}

export async function getUpdate(id: string, userId: string): Promise<Update | undefined> {
    const product = await database.product.findFirst({
        where: {
            belongsToId: userId,
            updates: { some: { id } },
        },
        include: {
            updates: true,
        },
    });

    return product?.updates?.at(0);
}

export type NewUpdate = Omit<Update, 'id' | 'createdAt' | 'updatedAt'>;

export async function createUpdate(userId: string, update: NewUpdate): Promise<Update> {
    const { productId, ...partialUpdate } = update;
    const now = new Date();
    return database.$transaction(async (tx) => {
        const product = await tx.product.findFirst({
            where: { id: productId, belongsToId: userId },
        });

        if (!product) {
            throw new Error('No product to insert into was found matching the criteria');
        }

        return tx.update.create({
            data: {
                ...partialUpdate,
                createdAt: now,
                updatedAt: now,
                product: {
                    connect: { id: productId },
                },
            },
        });
    });
}

export async function updateUpdate(id: string, userId: string, update: Partial<Update>) {
    const { productId: _, ...partialUpdate } = update;
    return database.$transaction(async (tx) => {
        const result = await tx.update.updateMany({
            where: {
                id,
                product: { belongsToId: userId },
            },
            data: partialUpdate,
        });

        if (result.count !== 1) {
            throw new Error('Zero or more than one update records were modified');
        }

        return tx.update.findUnique({ where: { id } });
    });
}

export async function deleteUpdate(id: string, userId: string) {
    return prisma.update.deleteMany({
        where: {
            id,
            product: { belongsToId: userId },
        },
    });
}