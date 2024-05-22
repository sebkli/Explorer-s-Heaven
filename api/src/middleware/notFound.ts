import CustomError from '../models/customError.js';

const notFound = () => {
  const error = new CustomError('Page not found', 404);
  throw error;
};

export default notFound;
