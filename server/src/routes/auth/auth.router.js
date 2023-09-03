const express = require("express");
const passport = require("passport");

const {
  HttpGetSecret,
  isLoggedIn,
  HttpSignOut,
} = require("./auth.controller");

const authRouters = express.Router();

authRouters.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRouters.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("call back");
  }
);
authRouters.get("/logout", HttpSignOut);
authRouters.get("/secret", isLoggedIn, HttpGetSecret);

module.exports = authRouters;

//   app.get("/secret", isLoggedIn, (req, res) => {
//     res.status(200).json({ message: "You are logged in!!!" });
//   });
