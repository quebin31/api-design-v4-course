import Joi from 'joi';
import { UpdateStatus } from '@prisma/client';

const updateSchemaMap = {
    title: Joi.string().min(5).max(128),
    body: Joi.string().min(5).max(512),
    status: Joi.string().valid(...Object.values(UpdateStatus)),
    asset: Joi.string().uri({ scheme: ['http', 'https'] }),
    version: Joi.string().pattern(/[0-9]+.[0-9]+.[0-9]+/),
};

export const optionalUpdateSchema = Joi.object(updateSchemaMap);
export const requiredUpdateSchema = Joi
    .object(updateSchemaMap)
    .options({ presence: 'required' })
    .keys({
        asset: updateSchemaMap.asset,
        version: updateSchemaMap.version,
    });

