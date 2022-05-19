import Joi, { string } from 'joi'
import { join } from 'path'

const register = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    cityId: Joi.string(),
    districtId: Joi.string(),
    wardId: Joi.string(),
    streetId: Joi.string()
})

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

const _delete = Joi.object({
  username: Joi.string().required(),
})

const changePassword = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

const update = Joi.object({
    fullname: Joi.string().required,
    dateOfBirth: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    cityId: Joi.string(),
    districtId: Joi.string(),
    wardId: Joi.string(),
    streetId: Joi.string(),
    citizenID: Joi.string(),
    gender: Joi.number(),
    zalo: Joi.string(),
    viper: Joi.string(),
    address: Joi.string(),

})
export default {register, login}
