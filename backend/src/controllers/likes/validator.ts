import Joi from "joi";


export const setLikeValidator = Joi.object({
    userId: Joi.string().uuid().required(),
    vacationId: Joi.string().uuid().required()
})

export const unLikeValidator = setLikeValidator