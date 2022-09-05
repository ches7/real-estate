import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const environmentvariable = `${process.env.JWT}`;
  
  if (!token) {
    return next(new ExpressError(401, "You are not authenticated!"));
  }

  jwt.verify(token, environmentvariable, (err, user) => {
    if (err) return next(new ExpressError(403, "invalid token"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(new ExpressError(403, "You are not authorized!"));
    }
  });
};

export const verifyAgent = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAgent) {
      next();
    } else {
      return next(new ExpressError(403, "You are not authorized!"));
    }
  });
};