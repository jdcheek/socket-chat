const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const user = document.getElementById("username");
let username;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const time = new Date();
  if (!username) {
    username = user.value;
  }
  if (input.value && username) {
    socket.emit(
      "chat message",
      `${username} ${time.toLocaleTimeString()} : ${input.value}`
    );
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
