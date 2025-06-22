import mongoose, { type Document, Schema } from "mongoose"

export interface IVolunteer extends Document {
  churchId: mongoose.Types.ObjectId
  memberId: mongoose.Types.ObjectId
  skills: string[]
  availability: {
    days: string[]
    timeSlots: string[]
  }
  interests: string[]
  experience?: string
  isActive: boolean
  backgroundCheckStatus: "Pending" | "Approved" | "Rejected" | "Not Required"
  backgroundCheckDate?: Date
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    skills: [{ type: String }],
    availability: {
      days: [{ type: String }],
      timeSlots: [{ type: String }],
    },
    interests: [{ type: String }],
    experience: { type: String },
    isActive: { type: Boolean, default: true },
    backgroundCheckStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Not Required"],
      default: "Not Required",
    },
    backgroundCheckDate: { type: Date },
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phone: { type: String, required: true },
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Volunteer || mongoose.model<IVolunteer>("Volunteer", VolunteerSchema)
