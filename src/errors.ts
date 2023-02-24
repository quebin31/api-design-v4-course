import { NextFunction, Request, Response } from 'express';
import './extensions/error';

interface RejectError extends Error {
    reject(res: Response): void;
}

function isRejectError(err: any): err is RejectError {
    return (err as RejectError).reject !== undefined;
}

export class InvalidInputError extends Error implements RejectError {
    reject(res: Response) {
        const json = { error: 'Invalid input', message: this.message };
        res.status(400).json(json);
    }
}

export class UnauthorizedError extends Error implements RejectError {

    reject(res: Response) {
        const json = { error: 'Unauthorized', message: this.message };
        res.status(401).json(json);
    }
}

export class NotFoundError extends Error implements RejectError {
    reject(res: Response) {
        const json = { error: 'Resource not found', message: this.message };
        res.status(404).json(json);
    }
}

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    if (isRejectError(err)) {
        err.reject(res);
    } else {
        const message = process.env.NODE_ENV === 'production' ? undefined : err.message;
        const json = { error: 'Internal server error', message };
        res.status(500).json(json);
    }
}
