import Property from "../models/Property.js";

const getProperties = async (req, res, next) => {
    let queryArray = [{ ['_id']: { ['$exists']: true } }]

    if (req.query.location != 'undefined' && req.query.location != undefined && req.query.location != '' 
        && req.query.location != 'null' && req.query.location != null) {
        let location = new String(req.query.location);
        location = location.charAt(0).toUpperCase() + location.slice(1);
        let locationQuery = { ['location']: { ['$eq']: location } }
        queryArray.push(locationQuery);
    }

    if (req.query.saleOrRent != 'undefined' && req.query.saleOrRent != undefined && req.query.saleOrRent != ''
    && req.query.saleOrRent != 'null' && req.query.saleOrRent != null) {
        let saleOrRent = new String(req.query.saleOrRent);
        let saleOrRentQuery = { ['saleOrRent']: { ['$eq']: saleOrRent } }
        queryArray.push(saleOrRentQuery);
    }

    if (req.query.beds != 'undefined' && req.query.beds != undefined && req.query.beds != ''
    && req.query.beds != 'null' && req.query.beds != null) {
        let beds = new Number(req.query.beds);
        let bedsQuery = { ['beds']: { ['$gte']: beds } }
        queryArray.push(bedsQuery);
    }

    if (req.query.price != 'undefined' && req.query.price != undefined && req.query.price != ''
    && req.query.price != 'null' && req.query.price != null) {
        let price = new Number(req.query.price);
        let priceQuery = { ['price']: { ['$lte']: price } }
        queryArray.push(priceQuery);
    }

    if (req.query.type != 'undefined' && req.query.type != undefined && req.query.type != ''
    && req.query.type != 'null' && req.query.type != null) {
        let type = new String(req.query.type);
        let typeQuery = { ['type']: { ['$eq']: type } }
        queryArray.push(typeQuery);
    }

    const properties = await Property.find({
        $and: queryArray
    })//.limit(20);
    console.log(queryArray)
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
    const updatedProperty = await Property.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json(updatedProperty);
};

const deleteProperty = async (req, res, next) => {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    res.status(200).json(deletedProperty);
};

export default { getProperties, getProperty, createProperty, updateProperty, deleteProperty };