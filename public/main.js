const socket = io();
// Login Selectors
const usernameInput = document.getElementById("username");
const login = document.querySelector(".login-container");
const usernameForm = document.getElementById("username-form");
const room = document.getElementById("room-input");

// Chat Selectors
const messages = document.getElementById("messages");
const chat = document.querySelector(".chat-container");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

// User Selectors
const userList = document.getElementById("user-list");

chat.hidden = true;

const state = {
  username: "",
};

const onLogin = (e) => {
  e.preventDefault();
  state.username = usernameInput.value;
  login.innerHTML = ``;
  chat.hidden = false;
  socket.emit("user joined", state);
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const time = new Date();
  socket.emit(
    "chat message",
    `${state.username} ${time.toLocaleTimeString()} : ${messageInput.value}`
  );
  messageInput.value = "";
});

const joinMessage = () => {
  const joinedMessage = document.createElement("li");
  joinedMessage.textContent = `${username} has joined the channel`;
  messages.appendChild(joinedMessage);
};

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

usernameForm.addEventListener("submit", (e) => onLogin(e));
