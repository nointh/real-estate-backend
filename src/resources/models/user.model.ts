import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from "@/resources/interfaces/user.interface"
import { string } from 'joi'

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            trim: true
        },
        phone: {
            type: String
        },
        fullname: {
            type: String
        },
        dateOfBirth: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password"))
        return next()
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

UserSchema.methods.isValidPassword = async function (password: string)
: Promise<Error | boolean>{
    return await bcrypt.compare(password, this? this.password : "")
}

export default model<IUser>("user", UserSchema)