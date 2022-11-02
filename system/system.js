"use strict";

const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  console.log("Connected", socket.id);
  socket.on("new-flight", (payload) => {
    io.emit("lunch", payload);
  });
  socket.on("flightInfo", (payload) => {
    console.log(payload);
  });
});
