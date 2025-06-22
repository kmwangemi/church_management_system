import mongoose, { type Document, Schema } from "mongoose"

export interface IEvent extends Document {
  churchId: mongoose.Types.ObjectId
  title: string
  description?: string
  startDate: Date
  endDate: Date
  location?: string
  category: "Service" | "Conference" | "Workshop" | "Social" | "Outreach" | "Other"
  organizerId: mongoose.Types.ObjectId
  capacity?: number
  registrationRequired: boolean
  isPublic: boolean
  branchId?: mongoose.Types.ObjectId
  status: "Planned" | "Active" | "Completed" | "Cancelled"
  createdAt: Date
  updatedAt: Date
}

const EventSchema = new Schema<IEvent>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String },
    category: {
      type: String,
      enum: ["Service", "Conference", "Workshop", "Social", "Outreach", "Other"],
      required: true,
    },
    organizerId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    capacity: { type: Number },
    registrationRequired: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    status: { type: String, enum: ["Planned", "Active", "Completed", "Cancelled"], default: "Planned" },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema)
