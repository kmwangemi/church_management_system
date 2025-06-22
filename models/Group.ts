import mongoose, { type Document, Schema } from "mongoose"

export interface IGroup extends Document {
  churchId: mongoose.Types.ObjectId
  name: string
  description?: string
  leaderId: mongoose.Types.ObjectId
  category: "Small Group" | "Youth Group" | "Bible Study" | "Prayer Group" | "Ministry Team" | "Other"
  meetingSchedule: {
    day: string
    time: string
    frequency: "Weekly" | "Bi-weekly" | "Monthly"
  }
  location?: string
  capacity: number
  isActive: boolean
  branchId?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const GroupSchema = new Schema<IGroup>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    name: { type: String, required: true },
    description: { type: String },
    leaderId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    category: {
      type: String,
      enum: ["Small Group", "Youth Group", "Bible Study", "Prayer Group", "Ministry Team", "Other"],
      required: true,
    },
    meetingSchedule: {
      day: { type: String, required: true },
      time: { type: String, required: true },
      frequency: { type: String, enum: ["Weekly", "Bi-weekly", "Monthly"], required: true },
    },
    location: { type: String },
    capacity: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Group || mongoose.model<IGroup>("Group", GroupSchema)
