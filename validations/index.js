import Joi from 'joi';

export const categoryValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
});

export const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  price: Joi.number().min(1).required(),
  discount: Joi.number(),
  quantity: Joi.number().min(1).required(),
  category: Joi.string().required(),
});

export const productUpdateValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  price: Joi.number().min(1),
  discount: Joi.number(),
  quantity: Joi.number().min(1),
  category: Joi.string(),
});

export const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  isAdmin: Joi.boolean(),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const orderValidationSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  address: Joi.string().required(),
});
