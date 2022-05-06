import { Schema, model } from "mongoose"
import IProvince from "@/resources/interfaces/province.interface"

const ProvinceSchema = new Schema<IProvince>({
  _id: {
    type: String,
    unique: true,
  },
  cityName: {
    type: String,
  },
  slug: {
    type: String,
  },
})
export default model<IProvince>("province", ProvinceSchema)
