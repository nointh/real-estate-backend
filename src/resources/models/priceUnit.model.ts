import { Schema, model } from "mongoose"
import IPriceUnit from "../interfaces/priceUnit.interface"

const PriceUnitSchema = new Schema<IPriceUnit>({
    label: { 
        type: String 
    },
})
export default model<IPriceUnit>("priceUnit", PriceUnitSchema)
