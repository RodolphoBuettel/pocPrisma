import joi from "joi";

export const TaksSchema = joi.object({
    name: joi.string().required(),
    responsibleId: joi.number().required(),
    description: joi.string().required(),
    status: joi.string().required()
})

export const ResponsibleSchema = joi.object({
    name: joi.string().required()
})