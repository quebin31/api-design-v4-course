import database from '../database';
import { Product } from '@prisma/client';

export async function getUserProducts(userId: string) {
    const user = await database.user.findUnique({
        where: { id: userId },
        include: {
            products: { orderBy: { createdAt: 'desc' } },
        },
    });

    return user?.products;
}

export async function getProduct(id: string, userId: string) {
    return database.product.findFirst({
        where: { id, belongsToId: userId },
    });
}

type NewProduct = Pick<Product, 'name'>

export async function createProduct(userId: string, product: NewProduct) {
    return database.product.create({
        data: {
            ...product,
            belongsTo: { connect: { id: userId } },
        },
    });
}

type UpdateProduct = Partial<Product> & Omit<Product, 'id'>;

export async function updateProduct(id: string, userId: string, product: UpdateProduct) {
    const user = await database.user.update({
        where: { id: userId },
        data: {
            products: {
                update: { where: { id }, data: product },
            },
        },
        include: {
            products: { where: { id } },
        },
    });

    return user?.products?.at(0);
}

export async function deleteProduct(id: string, userId: string) {
    return database.product.deleteMany({
        where: { id, belongsToId: userId },
    });
}