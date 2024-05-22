import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

import CustomError from '../models/customError.js';

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.file) {
    // eslint-disable-next-line no-console
    fs.unlink(req.file.path, (err) => console.log(err));
  }

  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(error.code || 500)
    .json({ message: error.message || 'Something went wrong' });
};

export default errorHandler;
