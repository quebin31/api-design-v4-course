import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export function validateWithSchema(schema: Joi.Schema) {
    return function(req: Request, res: Response, next: NextFunction) {
        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).json({ error: result.error.message });
        } else {
            next();
        }
    };
}