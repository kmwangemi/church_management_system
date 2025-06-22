import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  churchId: mongoose.Types.ObjectId
  email: string
  password: string
  firstName: string
  lastName: string
  role: "Pastor" | "Associate Pastor" | "Administrator" | "Elder" | "Deacon" | "Member"
  phone?: string
  isActive: boolean
  lastLogin?: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: ["Pastor", "Associate Pastor", "Administrator", "Elder", "Deacon", "Member"],
      required: true,
    },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  },
)

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
