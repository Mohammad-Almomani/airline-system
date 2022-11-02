"use strict";

const io = require("socket.io-client");
const host = "http://localhost:3000";

const socket = io.connect(host);

socket.on("lunch", (payload) => {
  runPilot(payload);
});

function handleTakeOff(flightInfo) {
  flightInfo.time = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  if (flightInfo.event === "take-off")
    console.log(
      `Pilot: flight with ID ${flightInfo.Details.flightID} took-off  Flight: `
    );
  flightInfo.time = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

  if (flightInfo.event === "arrived")
    console.log(
      `Pilot: flight with ID ${flightInfo.Details.flightID} has arrived  Flight: `
    );
  flightInfo.time = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
}

function runPilot(flight) {
  setTimeout(() => {
    flight.event = "take-off";
    handleTakeOff(flight);
    socket.emit("flightInfo", flight);
  }, 4000);

  setTimeout(() => {
    flight.event = "arrived";
    handleTakeOff(flight);
    socket.emit("flightInfo", flight);
    flight.event = "new-flight";
  }, 7000);
}

module.exports = { runPilot };
