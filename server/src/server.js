const http = require("http");
// const https = require("https");
const fs = require("fs");
require("dotenv").config();

const app = require("./app");

const { mongoConnect } = require("./services/mongo");
const { getDataFromFile } = require("./models/planets.model");
const { loadlaunchesData } = require("./models/launches.model");

// const httpsOptions = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

const server = http.createServer(app);
// const server = https.createServer(httpsOptions, app);

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
