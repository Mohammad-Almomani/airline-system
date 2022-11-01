"use strict";



const io = require("socket.io")(3000);

io.on("connection", (socket) => {
    console.log("Connected", socket.id);

    socket.on("new-flight", (payload) =>{
     handleNewFlight(payload);});

    socket.on("take-off", (payload) => {
        handleNewFlight22(payload);
    });
    // socket.on("arrived", (payload) => {
    //     console.log("arrived", payload);
    //     socket.broadcast.emit("arrived", payload);
    // });
});

const {runManager} = require("../manager/manager");
const {runPilot} = require("../pilot/pilot");

runManager();
runPilot();


function handleNewFlight(flightInfo) {
    if (flightInfo.event === "new-flight")
      console.log(
        `Manager: new flight with ID ‘${flightInfo.Details.flightID}’ have been scheduled`
      );
    if (flightInfo.event === "arrived")
      console.log(
        `Manager: we’re greatly thankful for the amazing flight, ‘${flightInfo.Details.pilot}’ 
        
        
        
        `
      );
    if (flightInfo.event === "new-flight") console.log("Flight: ", flightInfo);
    flightInfo.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  }
  

  function handleNewFlight22(flightInfo) {
    flightInfo.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      if(flightInfo.event === 'take-off') console.log(
      `Pilot: flight with ID ${flightInfo.Details.flightID} took-off  Flight: `, flightInfo
    );
    flightInfo.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  
    if(flightInfo.event === 'arrived') console.log(`Pilot: flight with ID ${flightInfo.Details.flightID} has arrived  Flight: `, flightInfo);
    flightInfo.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  }
