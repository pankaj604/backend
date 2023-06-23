import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error.js";
import { sendCookie } from "../utils/feature.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
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

export const forget = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique reset token
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the OTP and its expiry time in the user document
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 600000;

    await user.save();

    // Send an email to the user with the reset link
    var transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "pankajkewat04@outlook.com",
        pass: "pankaj6pack",
      },
    });
    console.log(email);
    const mailOptions = {
      from: "pankajkewat04@outlook.com",
      to: email,

      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested to reset your password.
      your otp is ${otp} `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const reset =async (req,res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return  res.json({ message: 'user not available' });
    }

    if (otp !== user.resetOtp || Date.now() > user.resetOtpExpiry) {
      return  res.status(500).json({ message: 'otp expired or wrong' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password
    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
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
