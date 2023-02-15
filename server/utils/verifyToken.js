import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";

/********************************************************/

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  const environmentvariable = `${process.env.JWT}`;
  
  if (!token) {
    return next(new ExpressError(401, "You are not authenticated!"));
  }

  jwt.verify(token, environmentvariable, (err, user) => {
    if (err) {return next(new ExpressError(403, "invalid token"))};
    req.user = user;
  });

  if (req.user.id === req.params.id || req.user.isAgent) {
    next();
  } else {
    return next(new ExpressError(403, "You are not authorized!"));
  }

};

export const verifyAgent = (req, res, next) => {
  //query database

  const token = req.cookies.access_token;
  const environmentvariable = `${process.env.JWT}`;
  
  if (!token) {
    return next(new ExpressError(401, "You are not authenticated!"));
  }

  jwt.verify(token, environmentvariable, (err, user) => {
    if (err) {return next(new ExpressError(403, "invalid token"))};
    req.user = user;
  });

  if (req.user.isAgent) {
    next();
  } else {
    return next(new ExpressError(403, "You are not authorized!"));
  }

};