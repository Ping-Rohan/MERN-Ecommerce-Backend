const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (data) => {
    socket.broadcast.emit("forward", data.message);
  });
});

server.listen(5000, () => {
  console.log("server started");
});
