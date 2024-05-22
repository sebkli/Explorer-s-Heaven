/* eslint-disable no-console */
import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';

import { RequestInterface } from './interfaces/RequestInterface.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import PostsRoute from './routes/posts.js';
import UsersRoute from './routes/users.js';

const PORT = process.env.port || 3000;
const MONGODB_URL = process.env.MONGODB_URL as string;

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static('uploads/images'));

app.use((req: RequestInterface, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
  next();
});

app.use('/api/users', UsersRoute);

app.use('/api/posts', PostsRoute);

app.use(notFound);

app.use(errorHandler);

try {
  await mongoose.connect(MONGODB_URL);
  console.log('Connected to database');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
