import mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  id: mongoose.Types.ObjectId;
  postsNumber: number;
  posts: mongoose.Types.ObjectId[];
  image?: string;
}
