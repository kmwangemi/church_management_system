import mongoose, { type Document, Schema } from "mongoose"

export interface IAttendance extends Document {
  churchId: mongoose.Types.ObjectId
  memberId: mongoose.Types.ObjectId
  eventId?: mongoose.Types.ObjectId
  groupId?: mongoose.Types.ObjectId
  serviceType:
    | "Sunday Service"
    | "Wednesday Service"
    | "Prayer Meeting"
    | "Bible Study"
    | "Special Event"
    | "Group Meeting"
  date: Date
  status: "Present" | "Absent" | "Late" | "Excused"
  notes?: string
  branchId?: mongoose.Types.ObjectId
  recordedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    serviceType: {
      type: String,
      enum: ["Sunday Service", "Wednesday Service", "Prayer Meeting", "Bible Study", "Special Event", "Group Meeting"],
      required: true,
    },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent", "Late", "Excused"], required: true },
    notes: { type: String },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    recordedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema)
