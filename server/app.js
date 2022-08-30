const express = require('express');
const mongoose = require('mongoose');
const Property = require('./models/property');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const { propertySchema } = require('./schemas');
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

const validateProperty = (req, res, next) => {
    const { error } = propertySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/properties', catchAsync(async (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    const properties = await Property.find({});
    res.status(200).json(properties)
}))

app.get('/properties/:id', catchAsync(async (req, res, next) => {
    const property = await Property.findById(req.params.id);
    if (property == null) {
        next()
    } else {
    res.status(200).json(property)
    }
}))

app.post('/properties', validateProperty, catchAsync(async (req, res) => {
    const property = new Property(req.body);
    await property.save();
    res.redirect(`/properties/${property._id}`);
}))

app.patch('/properties/:id', validateProperty, catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, { $set: req.body }, {new: true});
    res.status(200).json(updatedProperty);
}));

app.delete('/properties/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    res.status(200).json(deletedProperty);
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong'
    res.status(statusCode).json({ err })
})

app.listen(8080, () => {
    console.log('serving on port 8080')
})