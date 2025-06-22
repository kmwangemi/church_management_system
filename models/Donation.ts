import mongoose, { type Document, Schema } from "mongoose"

export interface IDonation extends Document {
  churchId: mongoose.Types.ObjectId
  donorId?: mongoose.Types.ObjectId
  donorName?: string
  amount: number
  currency: string
  category: "Tithe" | "Offering" | "Building Fund" | "Mission" | "Special" | "Other"
  paymentMethod: "Cash" | "Check" | "Bank Transfer" | "Credit Card" | "Mobile Money" | "Other"
  transactionId?: string
  date: Date
  notes?: string
  isAnonymous: boolean
  branchId?: mongoose.Types.ObjectId
  eventId?: mongoose.Types.ObjectId
  status: "Pending" | "Completed" | "Failed" | "Refunded"
  createdAt: Date
  updatedAt: Date
}

const DonationSchema = new Schema<IDonation>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    donorId: { type: Schema.Types.ObjectId, ref: "Member" },
    donorName: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    category: {
      type: String,
      enum: ["Tithe", "Offering", "Building Fund", "Mission", "Special", "Other"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Check", "Bank Transfer", "Credit Card", "Mobile Money", "Other"],
      required: true,
    },
    transactionId: { type: String },
    date: { type: Date, required: true },
    notes: { type: String },
    isAnonymous: { type: Boolean, default: false },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    status: { type: String, enum: ["Pending", "Completed", "Failed", "Refunded"], default: "Completed" },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema)
