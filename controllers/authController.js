import User from '../models/userModel.js';
import status from 'http-status';
import { createToken } from '../utils/index.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, _id } = await User.create(req.body);
    res.status(status.CREATED).send({ name, email, _id });
  } catch (error) {
    console.log('ERROR', error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.query;
    const resp = await User.paginate(
      {},
      { populate: 'category', page: pageNumber, limit: pageSize }
    );
    res.status(status.OK).send(resp);
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { ...req.body });
    res.status(200).send({ message: 'Successfully Updated' });
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: 'Successfully Deleted' });
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (data && data.password === password) {
      const token = createToken({
        email: data.email,
        password: data.password,
        _id: data._id,
      });
      const { email, _id, name } = data;
      return res.status(status.OK).send({ _id, email, name, token });
    }
    res
      .status(status.BAD_REQUEST)
      .send({ message: 'Email or Password is incorrect' });
  } catch (error) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
