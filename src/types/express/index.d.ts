import { JwtPayload } from 'jsonwebtoken';

export {};

declare global {
    namespace Express {
        // noinspection JSUnusedGlobalSymbols
        export interface Request {
            jwtPayload?: string | JwtPayload;
        }
    }
}