import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { RequestInterface } from '../interfaces/RequestInterface.js';
import CustomError from '../models/customError.js';

const authCheck = (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization failed');
    }

    const decodedToken = jwt.verify(
      token,
      'super_secret_key_for_the_blog_app',
    ) as JwtPayload;
    req.user = { userId: decodedToken.userId };
    return next();
  } catch (error) {
    return next(new CustomError('Authorization failed', 401));
  }
};

export default authCheck;
