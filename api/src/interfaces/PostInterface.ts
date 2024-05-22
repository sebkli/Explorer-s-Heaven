import mongoose from 'mongoose';

export interface PostInterface extends mongoose.Document {
  title: string;
  address: string;
  description: string;
  userID: mongoose.Types.ObjectId;
  coordinates: { lat: number; lng: number };
  image: string;
}
