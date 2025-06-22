import mongoose, { type Document, Schema } from "mongoose"

export interface IChurch extends Document {
  name: string
  denomination: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contact: {
    phone: string
    email: string
    website?: string
  }
  foundingYear?: number
  description?: string
  settings: {
    currency: string
    timezone: string
    language: string
  }
  createdAt: Date
  updatedAt: Date
}

const ChurchSchema = new Schema<IChurch>(
  {
    name: { type: String, required: true },
    denomination: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String },
    },
    foundingYear: { type: Number },
    description: { type: String },
    settings: {
      currency: { type: String, default: "USD" },
      timezone: { type: String, default: "UTC" },
      language: { type: String, default: "en" },
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Church || mongoose.model<IChurch>("Church", ChurchSchema)
