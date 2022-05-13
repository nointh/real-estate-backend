import { Schema, model } from "mongoose"
import IEstateType from "../interfaces/estateType.interface"

const EstateTypeSchema = new Schema<IEstateType>({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
})
export default model<IEstateType>("estateType", EstateTypeSchema)
