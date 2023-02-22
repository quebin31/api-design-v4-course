import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface AuthPayload {
    id: string;
    username: string;
}

export function createJwt(payload: AuthPayload): string {
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
        next()
    } catch (e) {
        res.status(401).send('Not authorized')
    }
}