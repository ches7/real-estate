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
    saleOrRent: String,
    agent: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
});

export default mongoose.model('Property', PropertySchema);