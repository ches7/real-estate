import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    beds: Number,
    baths: Number,
    receptions: Number,
    type: String,
    photos: [String],
    awsPhotoName: [String],
    saleOrRent: String,
    agent: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
});

export default mongoose.model('Property', PropertySchema);