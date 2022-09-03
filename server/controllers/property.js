import Property from "../models/property.js";
import catchAsync from "../utils/catchAsync.js";

export const getProperties = catchAsync(async (req, res, next) => {
    const properties = await Property.find({});
    res.status(200).json(properties);
});

export const getProperty = catchAsync(async (req, res, next) => {
        const property = await Property.findById(req.params.id);
        if (property == null) {
            next()
        } else {
        res.status(200).json(property)
        }  
});

export const createProperty = catchAsync(async (req, res, next) => {
    const property = new Property(req.body);
    await property.save();
    res.redirect(`/properties/${property._id}`);
});

export const updateProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, { $set: req.body }, {new: true});
    res.status(200).json(updatedProperty);
});

export const deleteProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    res.status(200).json(deletedProperty);
});