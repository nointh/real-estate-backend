import Document  from 'mongoose'

export default interface IUser extends Document {
    _id: string
    username: string
    password: string
    fullname: string
    dateOfBirth: string
    phone: string
    email: string
    cityId?: string,
    districtId?: string,
    wardId?: string,
    streetId?: string,

    isValidPassword(password: string): Promise<Error|Boolean>;
}