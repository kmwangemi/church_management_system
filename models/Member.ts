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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    memberId: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female'], required: true },
    maritalStatus: {
      type: String,
      enum: ['single', 'married', 'divorced', 'widowed'],
      required: true,
    },
    address: { type: String },
    country: { type: String },
    membershipDate: { type: Date, required: true },
    membershipStatus: {
      type: String,
      enum: ['active', 'inactive', 'transferred', 'deceased'],
      default: 'active',
    },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    departmentIds: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
    groupIds: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    occupation: { type: String },
    emergencyContact: {
      name: { type: String },
      relationship: { type: String },
      phone: { type: String },
    },
    baptismDate: { type: Date },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema)
