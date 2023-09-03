const { Strategy } = require("passport-google-oauth20");

const AUTH_OPTIONS = {
  callbackURL: "/v1/auth/google/callback",
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

const verifyCallBack = (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  done(null, profile);
};

const strat = new Strategy(AUTH_OPTIONS, verifyCallBack);

module.exports = strat;
