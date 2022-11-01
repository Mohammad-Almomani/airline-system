"use strict";

// const events = require("./events");
const {flight} = require("../manager/manager");


const io = require("socket.io-client");
const host = "http://localhost:3000";

const socket = io.connect(host);

socket.on("take-off", flight);

// function handleNewFlight(flightInfo) {
//   flightInfo.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
//     if(flightInfo.event === 'take-off') console.log(
//     `Pilot: flight with ID ${flightInfo.Details.flightID} took-off  Flight: `, flightInfo
//   );
//   flightInfo.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

//   if(flightInfo.event === 'arrived') console.log(`Pilot: flight with ID ${flightInfo.Details.flightID} has arrived  Flight: `, flightInfo);
//   flightInfo.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
// }


function runPilot () {
    setTimeout(() => {
        flight.event = "take-off";
      socket.emit("take-off", flight);
      }, 4000);

      setTimeout(() => {
        flight.event = "arrived";
        socket.emit("take-off", flight);
        flight.event = "new-flight";
      }, 7000);
    setInterval(() => {
    setTimeout(() => {
            flight.event = "take-off";
          socket.emit("take-off", flight);
          }, 4000);

          setTimeout(() => {
            flight.event = "arrived";
            socket.emit("take-off", flight);
            flight.event = "new-flight";
          }, 7000);
        }, 10000);

}


module.exports = {runPilot};