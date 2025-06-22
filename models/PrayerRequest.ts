import mongoose, { type Document, Schema } from "mongoose"

export interface IPrayerRequest extends Document {
  churchId: mongoose.Types.ObjectId
  requesterId?: mongoose.Types.ObjectId
  requesterName?: string
  title: string
  description: string
  category: "Health" | "Family" | "Financial" | "Spiritual" | "Work" | "Other"
  priority: "High" | "Medium" | "Low"
  isAnonymous: boolean
  isPublic: boolean
  status: "Open" | "In Progress" | "Answered" | "Closed"
  prayerCount: number
  branchId?: mongoose.Types.ObjectId
  assignedTo?: mongoose.Types.ObjectId
  followUpDate?: Date
  answeredDate?: Date
  testimony?: string
  createdAt: Date
  updatedAt: Date
}

const PrayerRequestSchema = new Schema<IPrayerRequest>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    requesterId: { type: Schema.Types.ObjectId, ref: "Member" },
    requesterName: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Health", "Family", "Financial", "Spiritual", "Work", "Other"],
      required: true,
    },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    isAnonymous: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
    status: { type: String, enum: ["Open", "In Progress", "Answered", "Closed"], default: "Open" },
    prayerCount: { type: Number, default: 0 },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Member" },
    followUpDate: { type: Date },
    answeredDate: { type: Date },
    testimony: { type: String },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.PrayerRequest || mongoose.model<IPrayerRequest>("PrayerRequest", PrayerRequestSchema)
