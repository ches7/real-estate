const mongoose = require('mongoose');
const { cities } = require('./cities');

const Property = require('../models/property');

mongoose.connect('mongodb://localhost:27017/real-estate');

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seed = async () => {
    await Property.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const home = new Property({
            location: `${sample(cities)}`,
            title: 'house'
        })
        await home.save();
    }
}

seed().then(() => {
    mongoose.connection.close();
})