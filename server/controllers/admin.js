//dotenv needs to be imported here to prevent crash -> due to env variables being imported outside export statement
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";
const adminPassword = process.env.ADMIN_PASSWORD

const signin = async (req, res, next) => {
  
    if(!req.body.password == adminPassword){
        return next(new ExpressError("Wrong password!", 400));
    }

    const token = jwt.sign(
      { isAdmin: 1 },
      `${process.env.JWT}`
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send();
  };

export default { signin }