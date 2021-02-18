const express = require("express");
const app = express();
const PORT = 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "../socket-chat/public" });
});

io.on("connection", (socket) => {
  socket.on("disconnect", (username) => {
    console.log(`${username} disconnected`);
  });

  socket.on("user joined", (user) => {});

  socket.on("user left", (user) => {
    console.log(user);
    io.emit("user left", user);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
