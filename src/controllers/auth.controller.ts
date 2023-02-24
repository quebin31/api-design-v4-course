import { Request, Response } from 'express';
import { createJwt, isPasswordValid } from '../modules/auth';
import * as authService from '../services/auth.service';

export async function signUp(req: Request, res: Response) {
    const user = await authService.createUser(req.body);
    const accessToken = createJwt(user);
    res.json({ id: user.id, accessToken });
}

export async function signIn(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await authService.findByUsername(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValid = await isPasswordValid(password, user.password);
    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const accessToken = createJwt(user);
    res.json({ id: user.id, accessToken });
}