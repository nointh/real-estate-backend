import Joi from 'joi'

const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
})
const update = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
})
const approve = Joi.object({
    id: Joi.string().required()
})
const decline = Joi.object({
    id: Joi.string().required()
})
export default { create, update, approve, decline}