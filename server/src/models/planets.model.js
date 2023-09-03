const { parse } = require("csv-parse");
const planets = require("./planets.mongo");
const fs = require("fs");

const path = require("path");

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const getDataFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          upsertPlanets(data.kepler_name);
          // habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject();
      })
      .on("end", async () => {
        const len = await getALllPlanets();
        console.log(`${len.length} habitable planets found!`);
        resolve();
      });
  });
};

const upsertPlanets = async (kepler_name) => {
  try {
    await planets.updateOne(
      { kepler_name: kepler_name },
      { kepler_name: kepler_name },
      { upsert: true }
    );
  } catch (err) {
    console.log(err);
  }
};

const getALllPlanets = async () => {
  return await planets.find({}, { _id: 0, __v: 0 });
};

module.exports = { getALllPlanets, getDataFromFile };
