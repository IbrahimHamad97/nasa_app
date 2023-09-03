const express = require("express");

const planetRouters = require("./planets/planets.router");
const launchesRouters = require("./launches/launches.router");
const authRouters = require("./auth/auth.router");

const api = express.Router();

api.use("/planets", planetRouters);
api.use("/launches", launchesRouters);
// api.use("/auth", authRouters);

module.exports = api;