import mongoose, { type Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  churchId: mongoose.Types.ObjectId;
  departmentName: string;
  description?: string;
  leaderId?: mongoose.Types.ObjectId;
  branchId?: mongoose.Types.ObjectId;
  meetingDay: string;
  meetingTime: string;
  isActive: boolean;
  budget?: number;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    churchId: {
      type: Schema.Types.ObjectId,
      ref: 'Church',
      required: true,
      trim: true,
    },
    leaderId: { type: Schema.Types.ObjectId, ref: 'Member', trim: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', trim: true },
    departmentName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    meetingDay: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    meetingTime: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String, trim: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    budget: { type: Number, trim: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Department ||
  mongoose.model<IDepartment>('Department', DepartmentSchema);
