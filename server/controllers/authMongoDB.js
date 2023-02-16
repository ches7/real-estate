import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
};

const signin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ExpressError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(new ExpressError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAgent: user.isAgent },
      `${process.env.JWT}`
    );

    const { password, isAgent, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAgent })
      .send();
};

const signout = async (req, res, next) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0)
  }).status(200).send();
};

export default { register, signin, signout };