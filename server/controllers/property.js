import Property from "../models/Property.js";
import ExpressError from "../utils/ExpressError.js";
import mongoose from "mongoose";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
//dotenv needs to be imported here to prevent crash -> due to env variables being imported outside export statement
import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
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

    if (!isNaN(req.query.beds) && req.query.beds != 'undefined' && req.query.beds != undefined && req.query.beds != ''
    && req.query.beds != 'null' && req.query.beds != null) {
        let beds = new Number(req.query.beds);
        let bedsQuery = { ['beds']: { ['$gte']: beds } }
        queryArray.push(bedsQuery);
    }

    if (!isNaN(req.query.price) && req.query.price != 'undefined' && req.query.price != undefined && req.query.price != ''
    && req.query.price != 'null' && req.query.price != null ) {
        let price = new Number(req.query.price);
        let priceQuery = { ['price']: { ['$lte']: price } }
        queryArray.push(priceQuery);
    }

    if (req.query.type != 'undefined' && req.query.type != undefined && req.query.type != ''
        && req.query.type != 'null' && req.query.type != null) {
        let type = new String(req.query.type);
        if (req.query.type === 'house') {
            let typeQuery = { ['type']: { ['$in']: ['terraced', 'bungalow', 'detached', 'semi-detached'] } }
            queryArray.push(typeQuery);
        } else {
            let typeQuery = { ['type']: { ['$eq']: type } }
            queryArray.push(typeQuery);
        };
    }

    console.log(queryArray);

    const properties = await Property.find({
        $and: queryArray
    })//.limit(20);

    for (let i = 0; i < properties.length; i++) {
        if (properties[i].awsPhotoName.length !== 0) {

            const photosArray = []
            for (let j = 0; j < properties[i].awsPhotoName.length; j++) {

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: properties[i].awsPhotoName[j],
                }
                const command = new GetObjectCommand(getObjectParams);
                let photo = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
                photosArray.push(photo);
            }
            properties[i].photos = photosArray

        }
    }

    res.status(200).json(properties);
};

const getProperty = async (req, res, next) => {
    var check = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!check) {
        return next(new ExpressError("Property not found!", 404));
    }
    let property = await Property.findById(req.params.id);
    if (!property) {
        return next(new ExpressError("Property not found!", 404));
    } else if (property.awsPhotoName.length === 0) {
        res.status(200).json(property)
    } else {

        const photosArray = []
        for (let i = 0; i < property.awsPhotoName.length; i++) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: property.awsPhotoName[i],
            }
            const command = new GetObjectCommand(getObjectParams);
            let photo = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            photosArray.push(photo);
        }
        property.photos = photosArray
        res.status(200).json(property)
    }
};

const createProperty = async (req, res, next) => {
    //capitalise input char 0 in order to find when searching for location
    let propertyLocation = new String(req.body.location);
    propertyLocation = propertyLocation.charAt(0).toUpperCase() + propertyLocation.slice(1);

    //get map coordinates for mapbox
    const geoQuery = propertyLocation + ", UK";
    const mbxResponse = await geocoder.forwardGeocode({
        query: geoQuery,
        limit: 1
    }).send();
    if (!mbxResponse) {
        return next(new ExpressError("Something went wrong!", 500));
    }
    const mbxCoordinates = mbxResponse.body.features[0].geometry.coordinates;

    //upload new photos to aws
    async function awsUpload() {
        const awsFileNames = [];
        for (let i = 0; i < req.files.length; i++) {
            let fileName = generateFileName();
            awsFileNames.push(fileName);
            const uploadParams = {
                Bucket: bucketName,
                Body: req.files[i].buffer,
                Key: fileName,
                ContentType: req.files[i].mimetype
            }
            await s3Client.send(new PutObjectCommand(uploadParams));
        }
        return awsFileNames;
    }
    const upload = await awsUpload();
    if (!upload) {
        return next(new ExpressError("Something went wrong!", 500));
    }

    //add property to mongodb
    const property = new Property({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        location: propertyLocation,
        beds: req.body.beds,
        baths: req.body.baths,
        receptions: req.body.receptions,
        type: req.body.type,
        photos: [],
        awsPhotoName: upload,
        saleOrRent: req.body.saleOrRent,
        agent: req.body.agent,
        geometry: {
            type: "Point",
            coordinates: mbxCoordinates,
        },
    });

    //respond with new property
    await property.save();
    await res.status(200).json(property)
};

const updateProperty = async (req, res, next) => {
    //check property exists
    const propertyBeforeUpdate = await Property.findById(req.params.id);
    if (!propertyBeforeUpdate) {
        return next(new ExpressError("Property not found!", 404));
    }

    //capitalise input char 0 in order to find when searching for location
    let propertyLocation = new String(req.body.location);
    propertyLocation = propertyLocation.charAt(0).toUpperCase() + propertyLocation.slice(1);

    //get map coordinates for mapbox
    const geoQuery = propertyLocation + ", UK";
    const mbxResponse = await geocoder.forwardGeocode({
        query: geoQuery,
        limit: 1
    }).send();
    if (!mbxResponse) {
        return next(new ExpressError("Something went wrong!", 500));
    }
    const mbxCoordinates = mbxResponse.body.features[0].geometry.coordinates;

    //upload new photos to aws
    async function awsUpload() {
        const awsFileNames = [];
        for (let i = 0; i < req.files.length; i++) {
            let fileName = generateFileName();
            awsFileNames.push(fileName);
            const uploadParams = {
                Bucket: bucketName,
                Body: req.files[i].buffer,
                Key: fileName,
                ContentType: req.files[i].mimetype
            }
            await s3Client.send(new PutObjectCommand(uploadParams));
        }
        return awsFileNames;
    }
    const upload = await awsUpload();
    if (!upload) {
        return next(new ExpressError("Something went wrong!", 500));
    }

    //delete old photos from aws
    if (propertyBeforeUpdate.awsPhotoName.length !== 0) {
        for (let i = 0; i < propertyBeforeUpdate.awsPhotoName.length; i++) {
            const params = {
                Bucket: bucketName,
                Key: propertyBeforeUpdate.awsPhotoName[i],
            }
            await s3Client.send(new DeleteObjectCommand(params))
        }
    }

    //update property in mongodb
    const updatedProperty = await Property.updateOne({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            location: propertyLocation,
            beds: req.body.beds,
            baths: req.body.baths,
            receptions: req.body.receptions,
            type: req.body.type,
            photos: [],
            awsPhotoName: upload,
            saleOrRent: req.body.saleOrRent,
            geometry: {
                type: "Point",
                coordinates: mbxCoordinates,
            },
        }
    });
    if (!updatedProperty) {
        return next(new ExpressError("Something went wrong!", 500));
    }

    //respond with updated property
    const propertyAfterUpdate = await Property.findById(req.params.id);
    if (!propertyAfterUpdate) {
        return next(new ExpressError("Property not found!", 404));
    }
    await res.status(200).json(propertyAfterUpdate);
};

const deleteProperty = async (req, res, next) => {
    //check if property exists
    const property = await Property.findById(req.params.id);
    if (!property) {
        return next(new ExpressError("Property not found!", 404));
    }

    //delete photos from aws
    if (property.awsPhotoName.length !== 0) {
        for (let i = 0; i < property.awsPhotoName.length; i++) {
            const params = {
                Bucket: bucketName,
                Key: property.awsPhotoName[i],
            }
            await s3Client.send(new DeleteObjectCommand(params))
        }
    }

    //delete property from mongodb and respond with deleted property
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json(property);
};

export default { getProperties, getProperty, createProperty, updateProperty, deleteProperty };