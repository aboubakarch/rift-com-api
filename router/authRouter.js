import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  updateUser,
} from '../controllers/authController.js';
import {
  loginValidation,
  productUpdateValidation,
  userValidation,
} from '../middlewares/dataValidation.js';
import {
  validateValidProductId,
  validationForUniqueEmail,
} from '../middlewares/dbValidation.js';

const authRouter = express.Router();

authRouter.get('/', getAllUsers);

authRouter.post(
  '/signup',
  userValidation,
  validationForUniqueEmail,
  createUser
);

authRouter.post('/login', loginValidation, loginUser);

authRouter.put(
  '/:id',
  validateValidProductId,
  productUpdateValidation,
  updateUser
);

authRouter.delete('/:id', validateValidProductId, deleteUser);

export default authRouter;
