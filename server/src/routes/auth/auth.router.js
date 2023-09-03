const express = require("express");

const {
  HttpGoogleSignIn,
  HttpGetSecret,
  isLoggedIn,
  HttpGoogleSignInCallback,
  HttpSignOut,
} = require("./auth.controller");

const authRouters = express.Router();

authRouters.get("/google", HttpGoogleSignIn);
authRouters.get("/google/callback", HttpGoogleSignInCallback);
authRouters.get("/logout", HttpSignOut);
authRouters.get("/secret", isLoggedIn, HttpGetSecret);

module.exports = authRouters;

//   app.get("/secret", isLoggedIn, (req, res) => {
//     res.status(200).json({ message: "You are logged in!!!" });
//   });
