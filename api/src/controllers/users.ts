import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestInterface } from '../interfaces/RequestInterface.js';
import CustomError from '../models/customError.js';
import User from '../models/user.js';
import { DEFAULT_USER_PATH, URL } from '../utils/apiPaths.js';

export const getUsers = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  let users;
  try {
    users = await User.find({}, '-email -password');
  } catch (e) {
    const error = new CustomError('Something went wrong,', 500);
    return next(error);
  }

  return res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const signUp = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new CustomError('Invalid inputs passed.', 422);
    return next(error);
  }

  const { name, email, password, repeatPassword } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    const error = new CustomError('Signing up failed, please try again', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new CustomError('User with this email already exists', 422);
    return next(error);
  }

  if (password !== repeatPassword) {
    const error = new CustomError("Passwords don't match", 422);
    return next(error);
  }

  let image;
  if (req.file) {
    image = `${URL}/${req.file.path.replace(/\\/g, '/')}`;
  } else {
    image = DEFAULT_USER_PATH;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(
      new CustomError('Could not create user, please try again.', 500),
    );
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    image,
    posts: [],
  });
  try {
    await newUser.save();
  } catch (e) {
    const error = new CustomError(
      'Signup up failed, please try again later',
      500,
    );
    return next(error);
  }

  return res.status(201).json({ userId: newUser.id, email: newUser.email });
};

export const logIn = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    const error = new CustomError('Logging in failed, please try again', 500);
    return next(error);
  }

  if (!existingUser) {
    return next(new CustomError('Invalid email or password', 422));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (e) {
    const error = new CustomError(
      'Could not log you in, please try again',
      500,
    );
    return next(error);
  }

  if (!isValidPassword) {
    return next(new CustomError('Invalid email or password', 422));
  }

  let token;
  try {
    token = await jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'super_secret_key_for_the_blog_app',
      {
        expiresIn: '1h',
      },
    );
  } catch (error) {
    return next(new CustomError('Could not log you in, please try again', 500));
  }

  return res.json({
    user: {
      id: existingUser.id,
      email: existingUser.email,
      token,
      image: existingUser.image,
    },
  });
};
