import Property from "../models/Property.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
import dotenv from "dotenv";
import multer from "multer";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import crypto from 'crypto'
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
dotenv.config()
const mapBoxToken = `${process.env.MAPBOX_TOKEN}`;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    region: bucketRegion
})

const milesToRadians = function (miles) {
    const earthRadiusInMiles = 3960;
    console.log(miles / earthRadiusInMiles);
    return miles / earthRadiusInMiles;
};

const getProperties = async (req, res, next) => {
    let queryArray = [{ ['_id']: { ['$exists']: true } }]

    if (req.query.location != 'undefined' && req.query.location != undefined && req.query.location != ''
        && req.query.location != 'null' && req.query.location != null) {
        if (req.query.radius != 'undefined' && req.query.radius != undefined && req.query.radius != ''
            && req.query.radius != 'null' && req.query.radius != null && !isNaN(req.query.radius) && req.query.radius != 0) {
            const geoData = await geocoder.forwardGeocode({
                query: `${req.query.location}, UK`,
                limit: 1
            }).send()
            console.log(geoData.body.features[0].geometry.coordinates);
            let radius = new Number(milesToRadians(req.query.radius));
            let radiusQuery = { ['geometry']: { ['$geoWithin']: { ['$centerSphere']: [geoData.body.features[0].geometry.coordinates, radius] } } };
            queryArray.push(radiusQuery);
        } else {
            let location = new String(req.query.location);
            location = location.charAt(0).toUpperCase() + location.slice(1);
            let locationQuery = { ['location']: { ['$eq']: location } }
            queryArray.push(locationQuery);
        }
    }

    if (req.query.agent != 'undefined' && req.query.agent != undefined && req.query.agent != ''
        && req.query.agent != 'null' && req.query.agent != null) {
        let agent = new String(req.query.agent);
        let agentQuery = { ['agent']: { ['$eq']: agent } }
        queryArray.push(agentQuery);
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
        if (req.query.type === 'houses') {
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
    const photos = req.file;

    //const fileBuffer = await sharp(photos.buffer).toBuffer();
    console.log(req.body)
    console.log(req.file)


    const fileName = generateFileName()
    const uploadParams = {
        Bucket: bucketName,
        Body: req.file.buffer,
        Key: fileName,
        ContentType: req.file.mimetype
    }

    await s3Client.send(new PutObjectCommand(uploadParams));

    const property = new Property({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location, //TODO capitalise input char 0 in order to find when searching for location 
        beds: req.body.beds,
        baths: req.body.baths,
        receptions: req.body.receptions,
        type: req.body.type,
        photos: [fileName],
        saleOrRent: req.body.saleOrRent,
        agent: req.body.agent,
        //geometry ----------------------------------------------------------------------------- TODO
    });
    await property.save();

    //res.send({})
    await res.redirect(`/properties/${property._id}`);
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