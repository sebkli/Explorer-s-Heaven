/* eslint-disable no-console */
import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import fs from 'fs';
import mongoose from 'mongoose';

import { PostInterface } from '../interfaces/PostInterface.js';
import { RequestInterface } from '../interfaces/RequestInterface.js';
import CustomError from '../models/customError.js';
import Post from '../models/post.js';
import User from '../models/user.js';
import { DEFAULT_POST_PATH, URL } from '../utils/apiPaths.js';
import getLocation from '../utils/getLocation.js';

export const getPostById = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.postid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (e) {
    const error = new CustomError('Could not find post with provided id', 500);
    return next(error);
  }

  if (!post) {
    const error = new CustomError('Could not find post with provided id', 422);
    return next(error);
  }

  return res.json({ post: post.toObject({ getters: true }) });
};

export const getPostsByUser = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.userid;

  let posts;
  try {
    posts = await Post.find({ userID: userId });
  } catch (e) {
    const error = new CustomError(
      'Could not find posts for provided user',
      500,
    );
    return next(error);
  }

  if (posts.length === 0) {
    const error = new CustomError(
      'Could not find posts for provided user',
      404,
    );
    return next(error);
  }

  return res
    .status(200)
    .json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

export const createPost = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new CustomError('Invalid inputs passed.', 422);
    return next(error);
  }

  const { title, address, description, userID } = req.body;

  let coordinates;
  try {
    coordinates = await getLocation(address);
  } catch (error) {
    return next(error);
  }

  let image;
  if (req.file) {
    image = `${URL}/${req.file.path.replace(/\\/g, '/')}`;
  } else {
    image = DEFAULT_POST_PATH;
  }

  const newPost: PostInterface = new Post({
    title,
    address,
    description,
    userID,
    coordinates,
    image,
  });
  let user;
  try {
    user = await User.findById(userID);
  } catch (e) {
    const error = new CustomError('Could not find the user', 500);
    return next(error);
  }

  if (!user) {
    const error = new CustomError('Could not find user with provided id', 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    await session.startTransaction();
    await newPost.save({ session });
    await User.findByIdAndUpdate(user.id, {
      $push: { posts: newPost },
      $inc: { postsNumber: +1 },
    }).session(session);
    await session.commitTransaction();
  } catch (e) {
    const error = new CustomError('Creating post failed', 500);
    return next(error);
  }

  return res.status(201).json({ post: newPost.toObject({ getters: true }) });
};

export const updatePost = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors });
  }

  const { title, address, description, userID, image } = req.body;

  let coordinates;
  try {
    coordinates = await getLocation(address);
  } catch (error) {
    return next(error);
  }

  const postId = req.params.postid;

  let newImage;
  if (req.file) {
    newImage = `${URL}/${req.file.path.replace(/\\/g, '/')}`;
  } else {
    newImage = image;
  }

  let oldPost: PostInterface | null;
  try {
    oldPost = await Post.findById(postId);
  } catch (error) {
    return next(new CustomError('Could not find the post', 500));
  }

  if (!oldPost) {
    return next(new CustomError('Could not find the post', 404));
  }

  if (req.user && oldPost.userID.toString() !== req.user.userId) {
    return next(new CustomError('You are not allowed to edit this post', 401));
  }

  let postToUpdate;
  const newPost = {
    title,
    address,
    description,
    userID,
    coordinates,
    image: newImage,
  };
  try {
    postToUpdate = await Post.findByIdAndUpdate(postId, newPost, {
      new: true,
      runValidators: true,
    });
  } catch (e) {
    const error = new CustomError('Could not update the post ', 500);
    return next(error);
  }

  if (oldPost.image !== DEFAULT_POST_PATH && oldPost.image !== newImage) {
    fs.unlink(oldPost.image.substring(22), (err) => {
      console.log(err);
    });
  }

  return res
    .status(200)
    .json({ post: postToUpdate?.toObject({ getters: true }) });
};

export const deletePost = async (
  req: RequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.postid;

  let post: PostInterface | null;
  try {
    post = await Post.findById(postId);
  } catch (e) {
    const error = new CustomError('Could not find the post', 500);
    return next(error);
  }

  if (!post) {
    const error = new CustomError(
      'Could not find the post with provided ID',
      404,
    );
    return next(error);
  }

  if (req.user && post.userID.toString() !== req.user.userId) {
    return next(
      new CustomError('You are not allowed to delete this post', 401),
    );
  }

  const imagePath = post.image as string;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Post.findByIdAndDelete(postId).session(session);
    const userId = post.userID;
    await User.findByIdAndUpdate(userId, {
      $pull: { posts: postId },
      $inc: { postsNumber: -1 },
    }).session(session);
    await session.commitTransaction();
  } catch (e) {
    const error = new CustomError('Something went wrong', 500);
    return next(error);
  }

  if (imagePath !== DEFAULT_POST_PATH) {
    fs.unlink(imagePath.substring(22), (err) => {
      console.log(err);
    });
  }

  return res.status(200).json({ message: 'Post deleted' });
};
