import express from "express";
import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import propertiesRoute from "./routes/properties.js";
import usersRoute from "./routes/users.js";
import agentsRoute from "./routes/agents.js"
import authRoute from "./routes/auth.js"
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

mongoose.connect('mongodb://127.0.0.1:27017/real-estate');

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true
 }));
 app.use(cookieParser());

app.use("/", propertiesRoute);
app.use("/users", usersRoute)
app.use("/", authRoute);
app.use("/agents", agentsRoute)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong'
    return res.status(statusCode).json({ 
        success: false,
        status: statusCode,
        message: err.message,
        stack: err.stack })
})

app.listen(8080, () => {
    console.log('serving on port 8080')
})