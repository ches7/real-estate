import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import propertiesRoute from "./routes/properties.js";
import usersRoute from "./routes/users.js";
import agentsRoute from "./routes/agents.js";
import authRoute from "./routes/auth.js";
import adminsRoute from "./routes/admins.js";
import cors from "cors";
import cookieParser from "cookie-parser";

mongoose.connect('mongodb://mongo:27017/real-estate');

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true
 }));
 app.use(cookieParser());

app.use("/api/", propertiesRoute);
app.use("/api/users", usersRoute)
app.use("/api/", authRoute);
app.use("/api/agents", agentsRoute);
app.use("/api/admin", adminsRoute);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    // const statusCode = err.status || 500;
    if (!err.message) err.message = 'Something Went Wrong'
    return res.status(statusCode).json({ 
        success: false,
        status: statusCode,
        message: err.message,
        stack: err.stack })
})

// app.use((error, req, res, next) => {
//     console.log('This is the rejected field ->', error.field);
//   });

app.listen(8080, () => {
    console.log('serving on port 8080')
})