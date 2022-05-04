import { Schema, model } from "mongoose"
import IStreet from "@/resources/interfaces/province.interface"

const StreetSchema = new Schema<IStreet>({
  streetCode: { type: String, unique: true },
  streetName: { type: String },
  prefix: { type: String },
  districtId: { type: String },
})
export default model<IStreet>("street", StreetSchema)
