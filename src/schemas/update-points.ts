import Joi from 'joi';

const updatePointsSchemaMap = {
    name: Joi.string().min(5).max(128),
    description: Joi.string().min(5).max(512),
    update_id: Joi.string().uuid(),
};

export const optionalUpdatePointsSchema = Joi.object(updatePointsSchemaMap);
export const requiredUpdatePointsSchema = Joi
    .object(updatePointsSchemaMap)
    .options({ presence: 'required' });