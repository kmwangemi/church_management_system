import mongoose, { type Document, Schema } from "mongoose"

export interface IMember extends Document {
  userId: mongoose.Types.ObjectId; // Link to User account
  memberId: string;
  dateOfBirth?: Date;
  gender: 'male' | 'female';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  address?: string;
  country?: string;
  membershipDate: Date;
  membershipStatus: 'active' | 'inactive' | 'transferred' | 'deceased';
  branchId?: mongoose.Types.ObjectId;
  departmentIds: mongoose.Types.ObjectId[];
  groupIds: mongoose.Types.ObjectId[];
  occupation?: string;
  emergencyContact: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  baptismDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      trim: true,
    },
    memberId: { type: String, required: true, unique: true, trim: true },
    dateOfBirth: { type: Date, trim: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
      trim: true,
      lowercase: true,
    },
    maritalStatus: {
      type: String,
      enum: ['single', 'married', 'divorced', 'widowed'],
      default: 'single',
      trim: true,
      lowercase: true,
    },
    address: { type: String, trim: true, lowercase: true },
    country: { type: String, trim: true, lowercase: true },
    membershipDate: { type: Date, trim: true },
    membershipStatus: {
      type: String,
      enum: ['active', 'inactive', 'transferred', 'deceased'],
      default: 'active',
    },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    departmentIds: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
    groupIds: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    occupation: { type: String, trim: true, lowercase: true },
    emergencyContact: {
      name: { type: String, trim: true, lowercase: true },
      relationship: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
    },
    baptismDate: { type: Date, trim: true },
    notes: { type: String, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema)
