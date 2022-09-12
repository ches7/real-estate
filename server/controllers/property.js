import Property from "../models/Property.js";

const getProperties = async (req, res, next) => {
    const location = req.query.location;
    // if (req.query.location !== null) {
    //     location = `location: ${req.query.location}`;
    // }
    const properties = await Property.find({
        location: location
    });
    res.status(200).json(properties);
};

const getProperty = async (req, res, next) => {
        const property = await Property.findById(req.params.id);
        if (property == null) {
            next()
        } else {
        res.status(200).json(property)
        }  
};

const createProperty = async (req, res, next) => {
    const property = new Property(req.body);
    await property.save();
    res.redirect(`/properties/${property._id}`);
};

const updateProperty = async (req, res, next) => {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, { $set: req.body }, {new: true});
    res.status(200).json(updatedProperty);
};

const deleteProperty = async (req, res, next) => {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    res.status(200).json(deletedProperty);
};

export default { getProperties, getProperty, createProperty, updateProperty, deleteProperty };