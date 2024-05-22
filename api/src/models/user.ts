import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { UserInterface } from '../interfaces/UserInterface.js';

const userSchema = new mongoose.Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  postsNumber: { type: Number, required: true, default: 0 },
  posts: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  ],
  image: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<UserInterface>('User', userSchema);
