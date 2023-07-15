import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      massage: "login first",
    });
  }
  const decode = jwt.verify(token, process.env.JWTSECRET);
  req.user = await User.findById(decode._id);
  // res.json({
  //   success: true,
  //   massage: "user found loged",
  // });
  next();
};
export const logstatus = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      massage: "login first",
    });
  }
  const decode = jwt.verify(token, process.env.JWTSECRET);
  req.user = await User.findById(decode._id);
  res.json({
    success: true,
    massage: "user found loged",
    user : req.user,
  });

};
