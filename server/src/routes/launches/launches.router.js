const express = require("express");
const {
  HttpGetAllLaunches,
  HttpaddNewlaunch,
  HttpAbortMission,
} = require("./launches.controller");

const launchesRouters = express.Router();

launchesRouters.get("/", HttpGetAllLaunches);
launchesRouters.post("/", HttpaddNewlaunch);
launchesRouters.delete("/:id", HttpAbortMission);

module.exports = launchesRouters;
