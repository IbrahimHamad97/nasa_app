// const apiURl = "http://localhost:8000/v1/";
const apiURl = "v1/";

// Load planets and return as JSON.
async function httpGetPlanets() {
  try {
    const data = await fetch(apiURl + "planets");
    if (data) {
      return await data.json();
    }
  } catch (err) {
    console.log(err);
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  try {
    const data = await fetch(apiURl + "launches");
    if (data) {
      const res = await data.json();
      return res.sort((a, b) => {
        return a.flightNumber - b.flightNumber;
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(apiURl + "launches", {
      method: "POST",
      body: JSON.stringify(launch),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(apiURl + "launches/" + id, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
