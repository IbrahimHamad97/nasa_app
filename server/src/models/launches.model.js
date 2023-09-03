const axios = require("axios");

const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

// const launches = new Map();
// const launch = {
//   flightNumber: latest,
//   mission: "hello",
//   rocket: "tehe",
//   launchDate: new Date("December 27, 2044"),
//   target: "planet",
//   customer: ["laaa", "yeeee"],
//   upcoming: true,
//   success: true,
// };
// launches.set(launch.flightNumber, launch);

const getLaunches = async (skip, limit) => {
  return await launches
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
  // return Array.from(launches.values());
};

const populateLaunches = async () => {
  console.log("Populating database");
  const res = await axios.post(process.env.SPACEX_URL_QUERY, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if (res.status !== 200) throw new Error("Error getting data");
  if (res.data?.docs) {
    const docs = res.data?.docs;
    for (let doc of docs) {
      const payloads = doc.payloads;
      const customers = payloads.flatMap((payload) => {
        return payload.customers;
      });
      const launch = {
        flightNumber: doc.flight_number,
        mission: doc.name,
        rocket: doc.rocket?.name,
        launchDate: doc.date_local,
        customers,
        upcoming: doc.upcoming,
        success: doc.success,
      };
      await saveLaunch(launch);
    }
  }
};

const loadlaunchesData = async () => {
  const launch = await findlaunch({ flightNumber: 1 });
  if (launch) return;
  else await populateLaunches();
};

const findlaunch = async (filter) => {
  return await launches.findOne(filter);
};

const findLatest = async () => {
  const latest = await launches.findOne().sort("-flightNumber");
  if (!latest) return 100;
  return latest.flightNumber;
};

const addNewlaunch = async (laun) => {
  const plan = await planets.findOne({ kepler_name: laun.target });
  if (!plan) throw new Error("No matching planet found");
  const late = await findLatest();
  const val = Object.assign(laun, {
    flightNumber: late,
    customers: [],
    upcoming: true,
    success: true,
  });
  saveLaunch(val);
};

const saveLaunch = async (laun) => {
  const res = await launches.findOneAndUpdate(
    { flightNumber: laun.flightNumber },
    laun,
    {
      upsert: true,
    }
  );
  return res;
};

const abortLaunch = async (id) => {
  const launch = await launches.findOneAndUpdate(
    { flightNumber: id },
    {
      upcoming: false,
      success: false,
    }
  );
  if (!launch) return;
  return launch;
};

module.exports = {
  getLaunches,
  addNewlaunch,
  abortLaunch,
  loadlaunchesData,
  findlaunch,
};
