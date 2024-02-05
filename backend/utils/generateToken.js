import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks crosssite scripting attacks
    sameSite: "strict", // CSRF attacks or cross site forgery attacks
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
};

export default generateTokenAndSetCookie;
