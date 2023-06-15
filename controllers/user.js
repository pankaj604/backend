import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error.js";
import { sendCookie } from "../utils/feature.js";

export const getallusers = async (req, res) => {
  const user = await User.find({});
  res.json({
    success: true,
    user,
  });
};

export const regester = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.json({
      success: false,
      massage: "logout succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const mydetails = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
