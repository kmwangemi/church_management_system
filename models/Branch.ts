import mongoose, { type Document, Schema } from "mongoose"

export interface IBranch extends Document {
  churchId: mongoose.Types.ObjectId;
  name: string;
  address: string;
  country: string;
  email?: string;
  phoneNumber?: string;
  pastorId?: mongoose.Types.ObjectId;
  capacity: number;
  establishedDate: Date;
  isActive: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<IBranch>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    pastorId: { type: Schema.Types.ObjectId, ref: 'Member' },
    capacity: { type: Number, required: true },
    establishedDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Branch || mongoose.model<IBranch>("Branch", BranchSchema)
