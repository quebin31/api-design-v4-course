import database from '../database';
import { hashPassword } from '../modules/auth';

export async function createUser({ username, password }: { username: string, password: string }) {
    const hashedPassword = await hashPassword(password);
    return database.user.create({ data: { username, password: hashedPassword } });
}

export async function findByUsername(username: string) {
    return database.user.findUnique({ where: { username } });
}