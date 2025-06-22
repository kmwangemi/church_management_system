import mongoose, { type Document, Schema } from "mongoose"

export interface IContributionDonation extends Document {
  churchId: mongoose.Types.ObjectId
  contributionId: mongoose.Types.ObjectId
  donorId?: mongoose.Types.ObjectId
  donorName?: string
  amount: number
  currency: string
  paymentMethod: "Cash" | "Check" | "Bank Transfer" | "Credit Card" | "Mobile Money" | "Other"
  message?: string
  isAnonymous: boolean
  date: Date
  status: "Pending" | "Completed" | "Failed" | "Refunded"
  createdAt: Date
  updatedAt: Date
}

const ContributionDonationSchema = new Schema<IContributionDonation>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    contributionId: { type: Schema.Types.ObjectId, ref: "Contribution", required: true },
    donorId: { type: Schema.Types.ObjectId, ref: "Member" },
    donorName: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Check", "Bank Transfer", "Credit Card", "Mobile Money", "Other"],
      required: true,
    },
    message: { type: String },
    isAnonymous: { type: Boolean, default: false },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Failed", "Refunded"], default: "Completed" },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.ContributionDonation ||
  mongoose.model<IContributionDonation>("ContributionDonation", ContributionDonationSchema)
