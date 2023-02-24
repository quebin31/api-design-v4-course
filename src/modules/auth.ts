import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors';

export async function isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 5);
}

export function createJwt(payload: { id: string }): string {
    const secret = process.env.JWT_SECRET!!;
    return jwt.sign({}, secret, { subject: payload.id });
}

function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
    return typeof (payload as JwtPayload) === 'object';
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.JWT_SECRET!!;
    const [_, accessToken] = req.headers.authorization?.split(' ') ?? [];

    if (!accessToken) {
        throw new UnauthorizedError('Invalid bearer token');
    }

    let payload;
    try {
        payload = jwt.verify(accessToken, secret);
    } catch (e) {
        throw new UnauthorizedError('Couldn\'t verify JWT');
    }

    if (!isJwtPayload(payload)) {
        throw new UnauthorizedError('Invalid JWT payload');
    }

    req.userId = payload?.sub;
    next();
}