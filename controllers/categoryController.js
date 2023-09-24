import Category from '../models/categoryModel.js';
import status from 'http-status';

export const createCategory = async (req, res) => {
  try {
    const resp = await Category.create(req.body);
    res.status(status.CREATED).send(resp);
  } catch (error) {
    console.log('ERROR', error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const resp = await Category.find();
    res.status(status.OK).send(resp);
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndUpdate(id, { ...req.body });
    res.status(status.OK).send({ message: 'Successfully Updated' });
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.status(status.OK).send({ message: 'Successfully Deleted' });
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
