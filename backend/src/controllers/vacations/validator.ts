import Joi from "joi";


export const updateVacationValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().min(0).max(10000).required(),
})

export const newVacationValidator = updateVacationValidator.append({
    imageUrl: Joi.string().required()
})