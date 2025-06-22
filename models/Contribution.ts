import mongoose, { type Document, Schema } from "mongoose"

export interface IContribution extends Document {
  churchId: mongoose.Types.ObjectId
  title: string
  description?: string
  category: "Wedding" | "Burial" | "Baby Dedication" | "Medical Emergency" | "Church Building" | "Other"
  targetAmount: number
  currentAmount: number
  currency: string
  startDate: Date
  endDate?: Date
  organizerId: mongoose.Types.ObjectId
  beneficiary?: string
  isActive: boolean
  isPublic: boolean
  branchId?: mongoose.Types.ObjectId
  status: "Active" | "Completed" | "Cancelled"
  createdAt: Date
  updatedAt: Date
}

const ContributionSchema = new Schema<IContribution>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["Wedding", "Burial", "Baby Dedication", "Medical Emergency", "Church Building", "Other"],
      required: true,
    },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    currency: { type: String, required: true, default: "USD" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    organizerId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    beneficiary: { type: String },
    isActive: { type: Boolean, default: true },
    isPublic: { type: Boolean, default: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    status: { type: String, enum: ["Active", "Completed", "Cancelled"], default: "Active" },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Contribution || mongoose.model<IContribution>("Contribution", ContributionSchema)
