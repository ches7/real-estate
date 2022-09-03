import express from "express";
import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import propertiesRoute from "./routes/properties.js";
import cors from "cors";

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

app.use("/", propertiesRoute);

app.get('/', (req, res) => {
    res.send('hello world')
})

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