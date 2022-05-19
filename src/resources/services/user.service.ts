import userModel from "@/resources/models/user.model";
import token from '@/utils/token'
import { access } from "fs";
import IUser from "../interfaces/user.interface";
import UserDto, { parseUserDto } from "../interfaces/userDto.interface";

class UserService {
  private user = userModel

    public async register(
        username: string,
        password: string,
        fullname: string,
        email: string,
        phone: string,
        dateOfBirth: string,
        cityId?: string,
        districtId?: string,
        wardId?: string,
        streetId?: string,
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
                dateOfBirth,
                cityId,
                districtId,
                wardId,
                streetId
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
  ): Promise<UserDto | Error> {
    try {
      const user = await this.user.findOne({ username })
      if (!user) {
        throw new Error("Username doesn't exist")
      }
      if (await user.isValidPassword(password)) {
        const userToken = token.createToken(user)
        return parseUserDto(user, userToken)
      } else {
        throw new Error("Wrong password")
      }
    } catch (error: any) {
      throw new Error(`Unable to log in - Error: ${error}`)
    }
  }
  public async delete(username: string): Promise<any | Error> {
    try {
      let user = await this.user.findOne({ username })
      if (!user) {
        throw new Error("Username doesn't exist")
      }
      await user.deleteOne({}, async () => {
        user = await this.user.findOne({ username })
        if (!user) {
          throw new Error("Unable to delete user - MongoError")
        } else {
          return "Success"
        }
      })
    } catch (error: any) {
      throw new Error(`Unable to delete user - Error: ${error}`)
    }
  }
    public async changePassword(
        id: string,
        oldPassword: string,
        newPassword: string
    ): Promise<boolean | Error>{
        try {
            const user = await this.user.findById(id)
            if (!user){
                throw new Error("Not a valid user")
            }
            if (await user.isValidPassword(oldPassword)){
                user.password = newPassword
                user.save()
                return true
            }
            else {
                throw new Error("Wrong password")
            }
        } catch (error: any) {
            throw new Error (`Unable to change password - Error: ${error}`)
        }
    }
    public async update(
        id: string,
        fullname?: string,
        dateOfBirth?: string,
        phone?: string,
        email?: string,
        cityId?: string,
        districtId?: string,
        wardId?: string,
        streetId?: string,
        ): Promise<boolean | Error>{
        try {
            const user = await this.user.findById(id)
            if (!user){
                throw new Error("Not a valid user")
            }
            if (fullname)
                user.fullname = fullname
            if (dateOfBirth)
                user.dateOfBirth = dateOfBirth                
            if (phone)
                user.phone = phone
            if (email)
                user.email = email
            if (cityId)
                user.cityId = cityId
 
            if (districtId)
                user.districtId = districtId

            if (wardId)
                user.wardId = wardId                
            if (streetId)
                user.streetId = streetId
            user.save()
            return true
        } catch (error: any) {
            throw new Error (`Unable to update user information - Error: ${error}`)
        }
    }
    public async getAllUsers(){
        try {
            const users = await this.user.find()
            
            return users
        } catch (error: any) {
            throw new Error (`Unable to get all users - Error: ${error}`)
        }
    }
    public async getUserById(id: string){
        try {
            const user = await this.user.findById(id)
            if (!user)
            {
                throw new Error(`Id ${id} is not existed` )
            }
            return user
        } catch (error: any) {
            throw new Error (`Unable to get user by id - Error: ${error}`)
        }
    }
    public async getUserByUsername(username: string){
        try {
            const user = await this.user.findOne()
            if (!user)
            {
                throw new Error(`Username ${username} is not existed`)
            }
            return user
        } catch (error: any) {
            throw new Error (`Unable to get user by username - Error: ${error}`)
        }
    }
    public async deleteUser(id: string){
        try {
            const user = await this.user.findByIdAndDelete(id)
            if (!user)
            {
                throw new Error(`Username ${user} is not existed`)
            }
            return user
        } catch (error: any) {
            throw new Error (`Unable to get user by username - Error: ${error}`)
        }
    }
}
export default UserService
