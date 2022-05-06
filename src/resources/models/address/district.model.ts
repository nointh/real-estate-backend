import { Schema, model } from "mongoose"
import IDistrict from "@/resources/interfaces/province.interface"

const DistricSchema = new Schema<IDistrict>({
  districtCode: { type: String, unique: true },
  districtName: { type: String },
  prefix: { type: String },
  provinceNameId: { type: String },
})
export default model<IDistrict>("district", DistricSchema)
