import express from 'express';
import {
  createOrder,
  getAllOrders,
  totalNumerOfProductSold,
} from '../controllers/orderController.js';
import { authorizeUser } from '../middlewares/authValidation.js';
import { orderValidation } from '../middlewares/dataValidation.js';

const orderRouter = express.Router();

orderRouter.get('/', authorizeUser, getAllOrders);

orderRouter.post('/', authorizeUser, orderValidation, createOrder);

orderRouter.get('/stats', authorizeUser, totalNumerOfProductSold);

export default orderRouter;
