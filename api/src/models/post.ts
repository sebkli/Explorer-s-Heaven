import mongoose from 'mongoose';

import { PostInterface } from '../interfaces/PostInterface.js';

const postSchema = new mongoose.Schema<PostInterface>({
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  coordinates: { lat: { type: Number }, lng: { type: Number } },
  image: { type: String, required: true },
});

export default mongoose.model<PostInterface>('Post', postSchema);
