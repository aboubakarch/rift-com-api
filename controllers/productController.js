import Product from '../models/productModel.js';
import status from 'http-status';

export const createProduct = async (req, res) => {
  try {
    const resp = await Product.create(req.body);
    res.status(status.CREATED).send(resp);
  } catch (error) {
    console.log('ERROR', error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.query;
    const resp = await Product.paginate(
      {},
      { populate: 'category', page: pageNumber, limit: pageSize }
    );
    res.status(status.OK).send(resp);
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { ...req.body });
    res.status(200).send({ message: 'Successfully Updated' });
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).send({ message: 'Successfully Deleted' });
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
