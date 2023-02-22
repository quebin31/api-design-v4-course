import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

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
        return res.status(401).send('Not authorized');
    }

    try {
        const payload = jwt.verify(accessToken, secret);
        if (!isJwtPayload(payload)) {
            return res.status(401).send('Not authorized');
        }

        req.jwtPayload = payload;
        next();
    } catch (e) {
        res.status(401).send('Not authorized');
    }
}