import Category from '../models/categoryModel.js';
import status from 'http-status';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

export const validationForUniqueCategory = async (req, res, next) => {
  try {
    const data = await Category.findOne({ ...req.body });
    if (data) {
      return res
        .status(status.BAD_REQUEST)
        .send({ message: 'Category with this name already exist' });
    }
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
  next();
};

export const validationForUniqueEmail = async (req, res, next) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      return res
        .status(status.BAD_REQUEST)
        .send({ message: 'User with this email already exist' });
    }
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
  next();
};

export const validateValidCategoryId = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res
        .status(status.NOT_FOUND)
        .send({ message: 'Category with this id is not exist' });
    }
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
  next();
};

export const validateValidProductId = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res
        .status(status.NOT_FOUND)
        .send({ message: 'Product with this id is not exist' });
    }
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
  next();
};
