const io = require("socket.io-client");
const socket = io("ws://localhost:8000");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendMessage = document.getElementById("send");

function addMessage(message, ClassName) {
  const li = document.createElement("li");
  li.textContent = message;
  if (ClassName) {
    li.classList.add(ClassName);
  }
  messages.appendChild(li);
}

socket.on("message", (data) => {
  addMessage(`${data.username} :${data.message}`);
});
socket.on("user-joined", (data) => {
  addMessage(data.message, "joined!");
});
socket.on("user-left", (data) => {
  addMessage(data.message, "left");
});

sendMessage.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    console.log(message);
    socket.emit("newMessage", { message, username: socket.id });
    messageInput.value = "";
  }
  socket.on("connect", () => {
    addMessage("you have joined!");
  });
});
