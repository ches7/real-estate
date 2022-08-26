const express = require('express');
const mongoose = require('mongoose');
const Property = require('./models/property');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/real-estate');

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ 
    origin: 'http://localhost:3000',
 }));

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/properties', async (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    const properties = await Property.find({});
    res.status(200).json(properties)
})

app.get('/properties/:id', async (req, res) => {
    const property = await Property.findById(req.params.id);
    res.status(200).json(property)
})

app.post('/properties', async (req, res) => {
    const property = new Property(req.body);
    await property.save();
    res.redirect(`/properties/${property._id}`);
})

app.patch('/properties/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, { $set: req.body }, {new: true});
    res.status(200).json(updatedProperty);
});

app.delete('/properties/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    res.status(200).json(deletedProperty);
})

app.listen(8080, () => {
    console.log('serving on port 8080')
})