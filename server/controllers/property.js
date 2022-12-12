import Property from "../models/Property.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
import dotenv from "dotenv";
dotenv.config()
const mapBoxToken = `${process.env.MAPBOX_TOKEN}`;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const getProperties = async (req, res, next) => {
    let queryArray = [{ ['_id']: { ['$exists']: true } }]

    if (req.query.location != 'undefined' && req.query.location != undefined && req.query.location != '' 
    && req.query.location != 'null' && req.query.location != null){
    const geoData = await geocoder.forwardGeocode({
        query: `${req.query.location}, UK`,
        limit: 1
    }).send()
    console.log(geoData.body.features[0].geometry.coordinates);
    }

    if (req.query.agent != 'undefined' && req.query.agent != undefined && req.query.agent != ''
    && req.query.agent != 'null' && req.query.agent != null) {
        let agent = new String(req.query.agent);
        let agentQuery = { ['agent']: { ['$eq']: agent } }
        queryArray.push(agentQuery);
    }

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

    //try if not NUmber?
    if (req.query.price != 'undefined' && req.query.price != undefined && req.query.price != ''
    && req.query.price != 'null' && req.query.price != null) {
        let price = new Number(req.query.price);
        let priceQuery = { ['price']: { ['$lte']: price } }
        queryArray.push(priceQuery);
    }

    if (req.query.type != 'undefined' && req.query.type != undefined && req.query.type != ''
    && req.query.type != 'null' && req.query.type != null) {
        let type = new String(req.query.type);
        if (req.query.type === 'houses'){
            let typeQuery = { ['type']: { ['$in']: ['terraced', 'bungalow', 'detached', 'semi-detached'] } }
            queryArray.push(typeQuery);
        } else {
            let typeQuery = { ['type']: { ['$eq']: type } }
            queryArray.push(typeQuery);
        };
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