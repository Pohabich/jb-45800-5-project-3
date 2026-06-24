import Joi from "joi"


export const draftVacationValidator = Joi.object({
    location: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).max(10000).required()
})
export const updateVacationValidator = draftVacationValidator.append({
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
})
export const newVacationValidator = draftVacationValidator.append({
    startDate: Joi.date().min('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
})

export const deleteVacationValidatior = Joi.object({
    vacationId: Joi.string().uuid().required()
})

export const getVacationValidator = deleteVacationValidatior


export const newVacationFilesValidator = Joi.object({
    imageUrl: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png'),
    }).unknown(true).required()
})

export const updateVacationFilesValidator  = Joi.object({
    imageUrl: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png'),
    }).unknown(true).optional()
})