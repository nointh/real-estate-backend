import { Schema, model } from "mongoose"
import IWard from "@/resources/interfaces/province.interface"

const WardSchema = new Schema<IWard>({
  wardCode: { type: String, unique: true },
  wardName: { type: String },
  prefix: { type: String },
  districtId: { type: String },
})
export default model<IWard>("ward", WardSchema)
