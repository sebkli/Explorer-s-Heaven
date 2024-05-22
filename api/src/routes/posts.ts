import express from 'express';
import { check } from 'express-validator';

import {
  createPost,
  deletePost,
  getPostById,
  getPostsByUser,
  updatePost,
} from '../controllers/posts.js';
import authCheck from '../middleware/authCheck.js';
import fileUpload from '../middleware/fileUpload.js';

const router = express.Router();

router.get('/:postid', getPostById);

router.get('/user/:userid', getPostsByUser);

router.use(authCheck);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').isString().not().isEmpty(),
    check('address').isString().not().isEmpty(),
    check('description').isString().not().isEmpty(),
  ],
  createPost,
);

router.patch(
  '/:postid',
  fileUpload.single('image'),
  [
    check('title').isString().not().isEmpty(),
    check('address').isString().not().isEmpty(),
    check('description').isString().not().isEmpty(),
  ],
  updatePost,
);

router.delete('/:postid', deletePost);

export default router;
