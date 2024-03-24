import asyncHandler from "express-async-handler";
import User from "../models/userModel.mjs";
import generateToken from "../config/generateToken.mjs";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try{
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ err :"User already exists." });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      const token = generateToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge : 3 * 60 * 60 * 1000});
      res.status(201).json({
        name: user.name,
        email: user.email,
      });
    }
  }
  catch(error){
    res.status(400).json({ err :"Unable to signup at this moment." });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = generateToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });
    return res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch(error){
    res.status(400).json({ err :"Unable to login at this moment." });
  }
});


export default { registerUser, authUser };