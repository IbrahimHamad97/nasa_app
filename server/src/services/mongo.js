const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected Successfully"))
    .catch((error) => console.log("Failed to connect", error));
};

const disconnect = async () => {
  await mongoose
    .disconnect(process.env.MONGO_URL)
    .then(() => console.log("Connected Terminated"))
    .catch((error) => console.log("Failed to connect", error));
};

module.exports = { mongoConnect: connect, disconnect };
