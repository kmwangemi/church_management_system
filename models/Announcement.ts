import mongoose, { type Document, Schema } from "mongoose"

export interface IAnnouncement extends Document {
  churchId: mongoose.Types.ObjectId
  title: string
  content: string
  category: "Service" | "Events" | "Youth" | "Finance" | "Small Groups" | "General"
  priority: "High" | "Medium" | "Low"
  authorId: mongoose.Types.ObjectId
  targetAudience: "All Members" | "Leaders Only" | "Specific Branch" | "Specific Department" | "Specific Group"
  targetIds?: mongoose.Types.ObjectId[]
  publishDate: Date
  expiryDate?: Date
  isPinned: boolean
  isPublished: boolean
  viewCount: number
  branchId?: mongoose.Types.ObjectId
  status: "Draft" | "Published" | "Scheduled" | "Expired"
  createdAt: Date
  updatedAt: Date
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["Service", "Events", "Youth", "Finance", "Small Groups", "General"],
      required: true,
    },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetAudience: {
      type: String,
      enum: ["All Members", "Leaders Only", "Specific Branch", "Specific Department", "Specific Group"],
      default: "All Members",
    },
    targetIds: [{ type: Schema.Types.ObjectId }],
    publishDate: { type: Date, required: true },
    expiryDate: { type: Date },
    isPinned: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    status: { type: String, enum: ["Draft", "Published", "Scheduled", "Expired"], default: "Draft" },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Announcement || mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema)
