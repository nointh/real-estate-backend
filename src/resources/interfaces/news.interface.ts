import { Document } from 'mongoose'
export default interface News extends Document {
    _id: string,
    title: string,
    body: [NewsDetails],
    author: string,
    description: string,
    submitday: Date,
    tags: string,
    type: string,
    views: number
}

interface NewsDetails extends Document {
    type: string,
    src: string,
    style: {
        fontSize: number,
        fontStyle: string
    }
}
