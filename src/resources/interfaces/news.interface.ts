import { Document } from 'mongoose'
export default interface News extends Document{
    title: string,
    body: string
}