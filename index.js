import { config } from 'dotenv';
config();

import express, { json } from 'express';
import categoryRouter from './router/categoryRouter.js';
import productRouter from './router/productRouter.js';
import connectDB from './db/index.js';
import authRouter from './router/authRouter.js';
import orderRouter from './router/orderRouter.js';

connectDB();

const app = express();
app.use(json());

app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);

app.listen(4000, () => console.log('Listening to port 4000'));
