const http = require("http");
const app = require("./app");

require("dotenv").config();

const { mongoConnect } = require("./services/mongo");
const { getDataFromFile } = require("./models/planets.model");
const { loadlaunchesData } = require("./models/launches.model");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

// Start server only when you get the data you need
// Generate self-cert with openssl
const startServer = async () => {
  await mongoConnect();
  await getDataFromFile();
  await loadlaunchesData();

  server.listen(PORT, () => {
    console.log("Listening To Port " + PORT);
  });
};

startServer();
