import Joi from 'joi';

const productSchemaMap = {
    name: Joi.string().min(5).max(128),
};

export const optionalProductSchema = Joi.object(productSchemaMap);
export const requiredProductSchema = Joi
    .object(productSchemaMap)
    .options({ presence: 'required' });
