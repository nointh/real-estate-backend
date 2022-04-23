import userModel from "@/resources/models/user.model";
import token from '@/utils/token'
import { access } from "fs";
import UserDto, { parseUserDto } from "../interfaces/userDto.interface";

class UserService {
    private user = userModel

    public async register(
        username: string,
        password: string,
        fullname?: string,
        email?: string,
        phone?: string,
        dateOfBirth?: string
    ): Promise<string | Error> {
        try {
            if (await this.user.findOne({username})){
                throw new Error("Username has already existed")
            }
            const user = await this.user.create({
                username,
                password,
                email,
                phone,
                fullname,
                dateOfBirth
            })
            const accessToken = token.createToken(user)
            return accessToken
        } catch(error: any) {
            throw new Error(`Unable to create user - Error: ${error}`)
        }
    }
    public async login(
        username: string,
        password: string
    ): Promise<UserDto | Error>{
        try {
            const user = await this.user.findOne({ username })
            if (!user){
                throw new Error("Username doesn't exist")
            }
            if (await user.isValidPassword(password)){
                const userToken = token.createToken(user)
                return parseUserDto(user, userToken)
            }
            else {
                throw new Error("Wrong password")
            }
        } catch (error: any) {
            throw new Error (`Unable to log in - Error: ${error}`)
        }
    }
}
export default UserService