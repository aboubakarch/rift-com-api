import express from 'express';
import { catagoryValidation } from '../middlewares/dataValidation.js';
import {
  validateValidCategoryId,
  validationForUniqueCategory,
} from '../middlewares/dbValidation.js';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);

categoryRouter.post(
  '/',
  catagoryValidation,
  validationForUniqueCategory,
  createCategory
);

categoryRouter.put(
  '/:id',
  validateValidCategoryId,
  catagoryValidation,
  validationForUniqueCategory,
  updateCategory
);

categoryRouter.delete('/:id', validateValidCategoryId, deleteCategory);

export default categoryRouter;
