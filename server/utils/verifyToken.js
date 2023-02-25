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

  if(!req.user.id){
    return next(new ExpressError("You are not authorized!", 403));
  }

  //req.body.agent is for updating properties
  if (req.user.id != req.params.id && req.user.id != req.body.id && req.user.id != req.body.agent) {
    return next(new ExpressError("You are not authorized!", 403)); 
  }
  next();
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

  if (!req.user.isAgent) {
    return next(new ExpressError("You are not authorized!", 403));
  }

  next()
};

export const verifyAdmin = (req, res, next) => {

  const token = req.cookies.access_token;
  const environmentvariable = `${process.env.JWT}`;
  
  if (!token) {
    return next(new ExpressError("You are not authenticated!", 401));
  }

  jwt.verify(token, environmentvariable, (err, user) => {
    if (err) {return next(new ExpressError("invalid token", 403))};
    req.user = user;
  });

  if (!req.user.isAdmin) {
    return next(new ExpressError("You are not authorized!", 403));
  }

  next()
};