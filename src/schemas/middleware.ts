import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { InvalidInputError } from '../errors';

export function validateWithSchema(schema: Joi.Schema) {
    return function(req: Request, res: Response, next: NextFunction) {
        const result = schema.validate(req.body);
        if (result.error) {
            throw new InvalidInputError(result.error.message);
        } else {
            next();
        }
    };
}