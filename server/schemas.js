import Joi from "joi";

const propertySchema = Joi.object({
    property: Joi.object({
        title: Joi.string().required().escapeHTML,
        //price: Joi.number().required().min(0),
        //image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

const userSchema = Joi.object({
    user: Joi.object({
        email: Joi.string().required(),
        //price: Joi.number().required().min(0),
        username: Joi.string().required(),
        password: Joi.string().required(),
        passwordVerify: Joi.string().required()
    }).required()
});

export default { propertySchema, userSchema };