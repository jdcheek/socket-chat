const express = require("express");
const app = express();
const PORT = 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(
  express.static("public", {
    index: false,
    immutable: true,
    cacheControl: true,
    maxAge: "30d",
  })
);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "../socket-chat/public" });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
