import { Schema, model } from "mongoose"
import IProjectType from "../interfaces/projectType.interface"

const ProjectTypeSchema = new Schema<IProjectType>({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
})
export default model<IProjectType>("projectType", ProjectTypeSchema)
