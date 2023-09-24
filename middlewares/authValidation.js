import jwt from 'jsonwebtoken';
import status from 'http-status';

export const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(status.FORBIDDEN)
      .send({ message: 'Authorizatio is required' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(status.FORBIDDEN)
      .send({ message: 'Authorizatio is required' });
  }
  jwt.verify(token, process.env.SEC_KEY, (err) => {
    if (err) {
      return res.status(status.FORBIDDEN).send({ message: 'Token is expired' });
    }
    return next();
  });
};
