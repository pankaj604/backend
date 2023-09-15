import jwt from "jsonwebtoken";

export const sendCookie = (user, res, massage, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      expires : new Date(Date.now() + 172800000),

      httpOnly: true,
       
      // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      // secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      massage,
    });
};