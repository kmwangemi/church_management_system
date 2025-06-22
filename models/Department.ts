import mongoose, { type Document, Schema } from "mongoose"

export interface IDepartment extends Document {
  churchId: mongoose.Types.ObjectId
  name: string
  description?: string
  headId?: mongoose.Types.ObjectId
  branchId?: mongoose.Types.ObjectId
  isActive: boolean
  budget?: number
  createdAt: Date
  updatedAt: Date
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    churchId: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    name: { type: String, required: true },
    description: { type: String },
    headId: { type: Schema.Types.ObjectId, ref: "Member" },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
    isActive: { type: Boolean, default: true },
    budget: { type: Number },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Department || mongoose.model<IDepartment>("Department", DepartmentSchema)
