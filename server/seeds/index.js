import mongoose from "mongoose";
import cities from "./cities.js";

import Property from "../models/Property.js";

mongoose.connect('mongodb://localhost:27017/real-estate');

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const types = ["detached", "terraced", "bungalow", "park home", "semi-detached", "flat", "farm/land"]

const sample = array => array[Math.floor(Math.random() * array.length)];

const seed = async () => {
    await Property.deleteMany({});
    for (let i = 0; i < 1000; i++) {
        const home = new Property({
            location: `${sample(cities)}`,
            title: 'Property',
            price: Math.floor((Math.random() * 1000000) + 1),
            description: 'this is the default description',
            beds: Math.floor((Math.random() * 10) + 1),
            baths: Math.floor((Math.random() * 5) + 1),
            receptions: Math.floor((Math.random() * 3) + 1),
            type: `${sample(types)}`
        })
        await home.save();
    }
}

seed().then(() => {
    mongoose.connection.close();
})