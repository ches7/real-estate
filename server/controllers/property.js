import Property from "../models/Property.js";

function maybeCreateMongoQuery(prop,queryProp,value){
    return value === '' ? null : {[prop]: {[queryProp]: value}};
  }

const getProperties = async (req, res, next) => {
    // const location = new RegExp(req.query.location, "i");
    let location = new String(req.query.location)
    location = location.charAt(0).toUpperCase() + location.slice(1);
    // location
    //console.log(req.query)

    const properties = await Property.find({ $and: [
        maybeCreateMongoQuery('_id', '$exists', true),
        maybeCreateMongoQuery('location', '$eq', location),

        ].filter(q => q !== null)
      })//.limit(20);

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