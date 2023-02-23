import database from '../database';
import { Product } from '@prisma/client';


export async function getUserProducts(userId: string) {
    const user = await database.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            products: true,
        },
    });

    return user?.products;
}

export async function getProduct(id: string, userId: string) {
    return database.product.findFirst({
        where: {
            id,
            belongsToId: userId,
        },
    });
}

type NewProduct = Pick<Product, 'name'>

export async function createProduct(userId: string, product: NewProduct) {
    return database.product.create({
        data: { ...product, belongsToId: userId },
    });
}

export async function updateProduct(id: string, userId: string, product: Partial<Product>) {
    return database.product.update({
        where: {
            id_belongsToId: {
                id,
                belongsToId: userId,
            },
        },
        data: product,
    });
}

export async function deleteProduct(id: string, userId: string) {
    return database.product.delete({
        where: {
            id_belongsToId: {
                id,
                belongsToId: userId,
            },
        },
    });
}