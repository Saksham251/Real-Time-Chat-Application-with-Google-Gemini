import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const existingUser = await userModel.findOne({email: req.body.email});
    if(existingUser){
      return res.status(401).json({
        message:"Email id already exists"
      });
    }
    const user = await userService.createUser(req.body);
    const token = user.generateJWT();
    console.log("Token: ",token);
    delete user._doc.password;

    res.status(201).json({ user, token });
  } catch (error) {
     console.error("Error in createUserController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) 
        return res.status(404).json({ message: "User not found" });
    if (!(await user.isValidPassword(password)))
      return res.status(401).json({ message: "Invalid password" });
    const token = user.generateJWT();
    delete user._doc.password;

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const profileController = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const getAllUsersController = async function (req, res) {
  try {
    const loggedInUser = await userModel.findById(req.user.id);
    const allUsers = await userService.getAllUsers({
      userId: loggedInUser._id,
    });
    return res.status(200).json({
      users: allUsers,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
