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
    saleOrRent: String
});

export default mongoose.model('Property', PropertySchema);