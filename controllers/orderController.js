import status from 'http-status';
import Order from '../models/orderModel.js';
import jwt from 'jsonwebtoken';

const getUserObject = (headers) => {
  const authHeader = headers.authorization;
  const token = authHeader.split(' ')[1];
  const user = jwt.verify(token, process.env.SEC_KEY);
  return user;
};

export const createOrder = async (req, res) => {
  const data = req.body;
  const user = getUserObject(req.headers);
  try {
    const resp = await Order.create({
      customer: user._id,
      product: data.productId,
      quantity: data.quantity,
      address: data.address,
    });
    res
      .status(status.CREATED)
      .send({ message: 'Order has been successfully placed' });
  } catch (error) {
    console.log('ERROR', error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { pageNumber = 1, pageSize = 10 } = req.query;
    const resp = await Order.paginate(
      {},
      { populate: 'product', page: pageNumber, limit: pageSize }
    );
    res.status(status.OK).send(resp);
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const totalNumerOfProductSold = async (req, res) => {
  const totalOrder = await Order.find().populate('product');

  console.log('TOTAL', totalOrder);
  let totalProductSold = 0;
  let income = 0;
  totalOrder.forEach((item) => {
    const price = item.product.price;
    totalProductSold += item.quantity;
    income += item.quantity * price;
  });
  res.status(status.OK).send({ totalProductSold, income });
};
