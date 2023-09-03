const {
  getLaunches,
  addNewlaunch,
  abortLaunch,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

const HttpGetAllLaunches = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const launches = await getLaunches(skip, limit);
  return res.status(200).json(launches);
};

const HttpaddNewlaunch = async (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing Mission Information" });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid Date" });
  }
  await addNewlaunch(launch);
  return res.status(201).json(launch);
};

const HttpAbortMission = async (req, res) => {
  try {
    if (req.params.id) {
      const launch = await abortLaunch(req.params.id);
      if (!launch)
        return res.status(404).json({ error: "Launch does not exist" });
      return res.status(200).json({
        ok: true,
      });
    } else return res.status(400).json({ error: "ID Missing" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error Cancelling" });
  }
};

module.exports = {
  HttpGetAllLaunches,
  HttpaddNewlaunch,
  HttpAbortMission,
};
