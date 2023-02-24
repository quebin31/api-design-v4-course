import database from '../database';
import { createJwt, hashPassword, isPasswordValid } from '../modules/auth';
import { BadRequestError, ConflictError } from '../errors';

async function createUser(data: { username: string, password: string }) {
    return database.user.create({ data });
}

async function findByUsername(username: string) {
    return database.user.findUnique({ where: { username } });
}

type AuthPayload = {
    username: string,
    password: string,
}

export async function register({ username, password }: AuthPayload) {
    try {
        const hashedPassword = await hashPassword(password);
        const user = await createUser({ username, password: hashedPassword });
        return { id: user.id, accessToken: createJwt({ id: user.id }) };
    } catch (e) {
        throw new ConflictError('Username already exists');
    }
}

export async function validate({ username, password }: AuthPayload) {
    const user = await findByUsername(username);
    if (!user) {
        throw new BadRequestError('Invalid username or password');
    }

    const isValid = await isPasswordValid(password, user.password);
    if (!isValid) {
        throw new BadRequestError('Invalid username or password');
    }

    return { id: user.id, accessToken: createJwt({ id: user.id }) };
}