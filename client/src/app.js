
const socket = io("ws://localhost:8000");

const messages = document.querySelector("#messages"); // This works in the browser

const messageInput = document.getElementById("message-input");

const sendMessage = document.getElementById("send");
console.log(messages)
function addMessage(message, ClassName) {
  const li = document.createElement("li");
  li.textContent = message;
  if (ClassName) {
    li.classList.add(ClassName);
  }
  messages.append(li);
}

socket.on("message", (data) => {
  addMessage(`${data.username} :${data.message}`, "");
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
