import Joi from "joi";
import {Roles} from "@tab761/role-enums";


export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})

export const signupValidator = loginValidator.append({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(Roles.ADMIN, Roles.USER).required()
})