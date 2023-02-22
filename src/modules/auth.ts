import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 5);
}

export function createJwt(payload: { id: string, username: string }): string {
    const secret = process.env.JWT_SECRET!!;
    return jwt.sign(payload, secret);
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.JWT_SECRET!!;
    const [_, accessToken] = req.headers.authorization?.split(' ') ?? [];

    if (!accessToken) {
        return res.status(401).send('Not authorized');
    }

    try {
        req.jwtPayload = jwt.verify(accessToken, secret);
        next();
    } catch (e) {
        res.status(401).send('Not authorized');
    }
}