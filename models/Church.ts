import mongoose, { type Document, Schema } from 'mongoose';

export interface IChurch extends Document {
  churchName: string;
  denomination: string;
  email: string;
  phoneNumber: string;
  website?: string;
  country: string;
  address: string;
  foundingYear: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChurchSchema = new Schema<IChurch>(
  {
    churchName: { type: String, required: true, trim: true, lowercase: true },
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
    foundingYear: { type: String, trim: true, required: true },
    description: { type: String, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Church ||
  mongoose.model<IChurch>('Church', ChurchSchema);
