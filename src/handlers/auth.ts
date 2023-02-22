import database from '../database';
import { Request, Response } from 'express';
import { createJwt, hashPassword, isPasswordValid } from '../modules/auth';

interface AuthResponse {
    id: string;
    accessToken: string;
}

export async function signUp(req: Request, res: Response) {
    const username = req.body.username;
    const password = await hashPassword(req.body.password);

    const user = await database.user.create({
        data: {
            username,
            password,
        },
    });

    const accessToken = createJwt(user);
    res.json({ id: user.id, accessToken } satisfies AuthResponse);
}

export async function signIn(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await database.user.findUnique({ where: { username: username } });
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValid = await isPasswordValid(password, user.password);
    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const accessToken = createJwt(user);
    res.json({ id: user.id, accessToken } satisfies AuthResponse);
}