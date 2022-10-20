import Property from "../models/Property.js";

const getProperties = async (req, res, next) => {
    let queryArray = [{['_id']: {['$exists']: true}}]
    
    let location = new String(req.query.location);
    if (location != 'undefined' && location != ''){
    location = location.charAt(0).toUpperCase() + location.slice(1);
    let locationQuery = {['location']: {['$eq']: location}}
    queryArray.push(locationQuery);
    }

    let saleOrRent = new String(req.query.saleOrRent);
    if (saleOrRent != 'undefined' && saleOrRent != ''){
        let saleOrRentQuery = {['saleOrRent']: {['$eq']: saleOrRent}}
        queryArray.push(saleOrRentQuery);
        }

    let beds = new Number(req.query.beds);
    if (beds != 'undefined' && beds != ''){
        let bedsQuery = {['beds']: {['$gte']: beds}}
        queryArray.push(bedsQuery);
        }

        let price = new Number(req.query.price);
        if (price != 'undefined' && price != ''){
            let priceQuery = {['price']: {['$lte']: price}}
            queryArray.push(priceQuery);
            }

            let type = new String(req.query.type);
            if (type != 'undefined' && type != ''){
                let typeQuery = {['type']: {['$eq']: type}}
                queryArray.push(typeQuery);
                }

    const properties = await Property.find({ $and: queryArray
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
    const updatedProperty = await Property.findByIdAndUpdate(id, { $set: req.body }, {new: true});
    res.status(200).json(updatedProperty);
};

const deleteProperty = async (req, res, next) => {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    res.status(200).json(deletedProperty);
};

export default { getProperties, getProperty, createProperty, updateProperty, deleteProperty };