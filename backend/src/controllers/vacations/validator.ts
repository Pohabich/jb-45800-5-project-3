import Joi from "joi"


export const updateVacationValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().min(0).max(10000).required(),
})

export const newVacationValidator = updateVacationValidator

export const newVacationFilesValidator = Joi.object({
    imageUrl: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png'),
    }).unknown(true).required()
})
export const updateVacationFilesValidator = newVacationFilesValidator

export const deleteVacationValidatior = Joi.object({
    id: Joi.string().uuid().required()
})

export const getVacationValidator = deleteVacationValidatior