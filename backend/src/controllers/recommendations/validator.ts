import Joi from "joi";


export const getRecommendationValidator = Joi.object({
    location: Joi.string().required()
})