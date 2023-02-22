import database from '../database';

export async function createUser({ username, password }: { username: string, password: string }) {
    return database.user.create({ data: { username, password } });
}

export async function findByUsername(username: string) {
    return database.user.findUnique({ where: { username } });
}