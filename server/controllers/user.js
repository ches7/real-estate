import User from "../models/User.js";

const updateUser = async (req,res,next)=>{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
}

const deleteUser = async (req,res,next)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
}

const getUser = async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}

const getUsers = async (req,res,next)=>{
    const users = await User.find();
    res.status(200).json(users);
}

export default { updateUser, deleteUser, getUser, getUsers }