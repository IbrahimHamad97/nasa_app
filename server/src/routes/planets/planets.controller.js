const { getALllPlanets } = require("../../models/planets.model");
const getAllPlanets = async (req, res) => {
  return res.status(200).json(await getALllPlanets());
};

module.exports = {
  getAllPlanets,
};
