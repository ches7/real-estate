import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
});

export default mongoose.model('Property', PropertySchema);