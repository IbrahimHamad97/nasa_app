const { Schema, model } = require("mongoose");

const launchesSchema = new Schema({
  flightNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
    // required: true,
  },
  customers: [ String ],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Launch = model("Launch", launchesSchema);

module.exports = Launch;
