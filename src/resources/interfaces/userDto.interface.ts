import IUser from "@/resources/interfaces/user.interface"

export default interface UserDto{
    _id: string
    username: string
    fullname?: string
    dateOfBirth?: string
    phone?: string
    email?: string
    token?: string
}
export const parseUserDto = (user: IUser, token: string) : UserDto =>{
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        token: token
    }
}