import express from 'express';
import { check } from 'express-validator';

import { getUsers, logIn, signUp } from '../controllers/users.js';
import fileUpload from '../middleware/fileUpload.js';

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('email').normalizeEmail().isEmail(),
    check('name').isString().not().isEmpty(),
    check('password').isString().isLength({ min: 8 }),
    check('repeatPassword').isString().isLength({ min: 8 }),
  ],
  signUp,
);

router.post('/login', logIn);

export default router;
