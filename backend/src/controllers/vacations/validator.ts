import Joi from "joi"
import { parse, isValid } from "date-fns"


const customMessages = {
    // Joi built-in
    // "string.pattern.base": "Date must be in format YYYY-MM-DD",
    // "any.required": "Field is required",
    // "number.base": "Must be a number",

    // custom date validation
    "date.invalid": "Invalid calendar date",
    "date.range": "End date must be >= start date",
    "date.past": "Start date cannot be in the past"
}
const datePattern = /^\d{4}-\d{2}-\d{2}$/

const dateSchema = Joi.string()
    .pattern(datePattern)
    .custom((value, helpers) => {
        const parsed = parse(value, "yyyy-MM-dd", new Date())

        return isValid(parsed) ? value : helpers.error("date.invalid")
    })
    .messages(customMessages)

const validateRange = (value: any, helpers: Joi.CustomHelpers) => {
    return (value.endDate < value.startDate) ? helpers.error("date.range") : value
}
const validateNotPast = (value: any, helpers: Joi.CustomHelpers) => {
    const today = new Date().toISOString().slice(0, 10)

    return (value.startDate < today) ? helpers.error("date.past") : value
}

const draftVacationValidator = Joi.object({
    location: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).max(10000).required()
})
export const updateVacationValidator = draftVacationValidator.append({
    startDate: dateSchema.required(),
    endDate: dateSchema.required()
}).custom(validateRange).messages(customMessages)

export const newVacationValidator = draftVacationValidator.append({
    startDate: dateSchema.required(),
    endDate: dateSchema.required()
}).custom((value, helpers) => {
    const res = validateRange(value, helpers)

    return (res !== value) ? res : validateNotPast(value, helpers)
}).messages(customMessages)

export const deleteVacationValidatior = Joi.object({
    vacationId: Joi.string().uuid().required()
})
export const getVacationValidator = deleteVacationValidatior

export const newVacationFilesValidator = Joi.object({
    imageUrl: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png'),
    }).unknown(true).required()
})
export const updateVacationFilesValidator = Joi.object({
    imageUrl: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png'),
    }).unknown(true).optional()
})