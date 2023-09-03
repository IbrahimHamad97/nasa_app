const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");

const path = require("path");

const api = require("./routes/api");
const strat = require("./services/passport");

passport.use(strat);

const app = express();
// Helmet is used to protect against common security issues
app.use(helmet());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);
// app.use('/v2', api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
