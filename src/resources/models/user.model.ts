import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import IUser from "@/resources/interfaces/user.interface"
import { num } from "envalid"

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    cityId: {
      type: String,
    },
    districtId: {
      type: String,
    },
    wardId: {
      type: String,
    },
    streetId: {
      type: String,
    },
    accountStatus: {
      status: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    postCount: {
      type: Number,
    },
    balance: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this ? this.password : "")
}

export default model<IUser>("user", UserSchema)
