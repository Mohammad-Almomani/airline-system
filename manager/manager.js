"use strict";

const { faker } = require("@faker-js/faker");

class System {
  constructor() {
    this.info = {
      event: "new-flight",
      time: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      Details: {
        airLine: "Ibrahim EL Droubi Airlines",
        flightID: faker.datatype.uuid(),
        pilot: faker.name.fullName(),
        destination: faker.helpers.fake(
          "{{address.country}}, {{address.city}}"
        ),
      },
    };
  }
  idChanger() {
    this.info.Details.flightID = faker.datatype.uuid();
  }
  dateUpdater() {
    this.info.time = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
  }
  destinationChanger() {
    this.info.Details.destination = faker.helpers.fake(
      "{{address.country}}, {{address.city}}"
    );
  }
  pilotChanger() {
    this.info.Details.pilot = faker.name.fullName();
  }
}

let newFlight = new System();

setInterval(() => {
  newFlight.idChanger();
  newFlight.dateUpdater();
  newFlight.destinationChanger();
  newFlight.pilotChanger();
}, 10000);

let flight = newFlight.info;

const io = require("socket.io-client");
const host = "http://localhost:3000";

const socket = io.connect(host);

socket.on("new-flight");

function handleNewFlight(flightInfo) {
  if (flightInfo.event === "new-flight")
    console.log(
      `Manager: new flight with ID ‘${flightInfo.Details.flightID}’ have been scheduled`
    );
  if (flightInfo.event === "arrived")
    console.log(
      `Manager: we’re greatly thankful for the amazing flight, ‘${flightInfo.Details.pilot}’`
    );
  flightInfo.time = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
}

function runManager() {
  socket.emit("new-flight", flight);

  handleNewFlight(flight);
  socket.emit("flightInfo", flight);

  setTimeout(() => {
    flight.event = "arrived";
    handleNewFlight(flight);
    flight.event = "new-flight";
  }, 9000);

  setInterval(() => {
    socket.emit("new-flight", flight);

    handleNewFlight(flight);
    socket.emit("flightInfo", flight);

    setTimeout(() => {
      flight.event = "arrived";
      handleNewFlight(flight);
      flight.event = "new-flight";
    }, 9000);
  }, 10000);
}
runManager();
module.exports = { flight };
