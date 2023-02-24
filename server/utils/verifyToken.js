import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";

/********************************************************/

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  const environmentvariable = `${process.env.JWT}`;
  
  if (!token) {
    return next(new ExpressError("You are not authenticated!", 401));
  }

  jwt.verify(token, environmentvariable, (err, user) => {
    if (err) {return next(new ExpressError("invalid token", 403))};
    req.user = user;
  });

  if (req.user.id == req.params.id || req.user.id == req.body.id || req.user.id == req.body.agent || req.user.isAgent) {
    //change to isAdmin when admin route done
    //req.body.agent is for updating properties
    next();
  } else {
    return next(new ExpressError("You are not authorized!", 403));
  }

};

export const verifyAgent = (req, res, next) => {

  const token = req.cookies.access_token;
  const environmentvariable = `${process.env.JWT}`;
  
  if (!token) {
    return next(new ExpressError("You are not authenticated!", 401));
  }

  jwt.verify(token, environmentvariable, (err, user) => {
    if (err) {return next(new ExpressError("invalid token", 403))};
    req.user = user;
  });


  if (req.user.isAgent != 1) {
    return next(new ExpressError("You are not authorized!", 403));
  }

  next()
};