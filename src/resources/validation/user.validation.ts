import Joi, { string } from "joi"

const register = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

const _delete = Joi.object({
  username: Joi.string().required(),
})

export default { register, login, _delete }
