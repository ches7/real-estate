import propertySchema from "../schemas.js";
import ExpressError from "./ExpressError.js";

export const validateProperty = (req, res, next) => {
    const { error } = propertySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};