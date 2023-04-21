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

const MONGO_URI =  `${process.env.MONGO_URI}` || 'mongodb://127.0.0.1:27017/real-estate';

// mongoose.connect('mongodb://127.0.0.1:27017/real-estate');


// mongoose.connect(mongoAddress);

// mongoose.connection.on("error", console.error.bind(console, "connection error:"));
// mongoose.connection.once("open", () => {
//     console.log("Database connected");
// });

// const options = {
//     autoIndex: false, // Don't build indexes
//     reconnectTries: 30, // Retry up to 30 times
//     reconnectInterval: 500, // Reconnect every 500ms
//     poolSize: 10, // Maintain up to 10 socket connections
//     // If not connected, return errors immediately rather than waiting for reconnect
//     bufferMaxEntries: 0
//   }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect(MONGO_URI).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    console.log(err);
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

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