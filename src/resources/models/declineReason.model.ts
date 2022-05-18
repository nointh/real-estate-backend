import { Schema, model } from "mongoose"
import IDeclineReason from "../interfaces/declineReason.interface"

const DeclineReasonSchema = new Schema<IDeclineReason>({
  title: {
    type: String,
  },
})
export default model<IDeclineReason>("declineReason", DeclineReasonSchema)
