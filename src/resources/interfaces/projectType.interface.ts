import { Document } from "mongoose"

export default interface IProjectType extends Document {
    _id: string
    name: string
    slug: string
}
