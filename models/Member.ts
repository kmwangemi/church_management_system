import mongoose, { type Document, Schema } from "mongoose"

export interface IMember extends Document {
  churchId: mongoose.Types.ObjectId
  memberId: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  dateOfBirth?: Date
  gender: "Male" | "Female"
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed"
  address: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  membershipDate: Date
  membershipStatus: "Active" | "Inactive" | "Transferred" | "Deceased"
  branchId?: mongoose.Types.ObjectId
  departmentIds: mongoose.Types.ObjectId[]
  groupIds: mongoose.Types.ObjectId[]
  occupation?: string
  emergencyContact: {
    name?: string
    relationship?: string
    phone?: string
  }
  baptismDate?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const MemberSchema = new Schema<IMember>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    memberId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], required: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    membershipDate: { type: Date, required: true },
    membershipStatus: { type: String, enum: ["Active", "Inactive", "Transferred", "Deceased"], default: "Active" },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    departmentIds: [{ type: Schema.Types.ObjectId, ref: "Department" }],
    groupIds: [{ type: Schema.Types.ObjectId, ref: "Group" }],
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
)

export default mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema)
