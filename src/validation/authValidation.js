import { Joi, Segments } from 'celebrate';

export const registerUserValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
};

export const loginUserValidation = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
