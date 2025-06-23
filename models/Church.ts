import mongoose, { type Document, Schema } from 'mongoose';

export interface IChurch extends Document {
  name: string;
  denomination: string;
  email: string;
  phoneNumber: string;
  website?: string;
  country: string;
  address: string;
  foundingYear?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChurchSchema = new Schema<IChurch>(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    denomination: { type: String, required: true, trim: true, lowercase: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    country: { type: String, required: true, trim: true, lowercase: true },
    address: { type: String, required: true, trim: true, lowercase: true },
    website: { type: String, trim: true },
    foundingYear: { type: Number, trim: true },
    description: { type: String, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Church ||
  mongoose.model<IChurch>('Church', ChurchSchema);
