import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors';
import config from '../config';

export async function isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 5);
}

export function createJwt(payload: { id: string }): string {
    return jwt.sign({}, config.jwtSecret, { subject: payload.id });
}

function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
    return typeof (payload as JwtPayload) === 'object';
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const [_, accessToken] = req.headers.authorization?.split(' ') ?? [];

    if (!accessToken) {
        throw new UnauthorizedError('Invalid bearer token');
    }

    let payload;
    try {
        payload = jwt.verify(accessToken, config.jwtSecret);
    } catch (e) {
        throw new UnauthorizedError('Couldn\'t verify JWT');
    }

    if (!isJwtPayload(payload)) {
        throw new UnauthorizedError('Invalid JWT payload');
    }

    req.userId = payload?.sub;
    next();
}