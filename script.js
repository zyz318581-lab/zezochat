let currentUser = "";
let currentRoom = "";
let rooms = {};

function showRoomOptions() {
  currentUser = document.getElementById("username").value.trim();
  if (!currentUser) return alert("أدخل اسمك أولاً");
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("room-options").style.display = "block";
}

function showCreateRoom() {
  document.getElementById("room-options").style.display = "none";
  document.getElementById("create-room").style.display = "block";
}

function showJoinRoom() {
  document.getElementById("room-options").style.display = "none";
  document.getElementById("join-room").style.display = "block";
}

function createRoom() {
  const name = document.getElementById("newRoomName").value.trim();
  const pass = document.getElementById("newRoomPass").value;
  if (!name || !pass) return alert("أدخل اسم الغرفة وكلمة السر");
  rooms[name] = { password: pass, messages: [], users: [], typing: {} };
  enterRoom(name);
}

function joinRoom() {
  const name = document.getElementById("joinRoomName").value.trim();
  const pass = document.getElementById("joinRoomPass").value;
  if (!rooms[name]) return alert("الغرفة غير موجودة");
  if (rooms[name].password !== pass) return alert("كلمة السر خاطئة");
  enterRoom(name);
}

function enterRoom(name) {
  currentRoom = name;
  if (!rooms[name].users.includes(currentUser)) {
    rooms[name].users.push(currentUser);
  }
  document.getElementById("create-room").style.display = "none";
  document.getElementById("join-room").style.display = "none";
  document.getElementById("chat-room").style.display = "block";
  document.getElementById("roomTitle").innerText = `?? ${name}`;
  updateChat();
  updateUsers();
}

function sendMessage() {
  const msg = document.getElementById("messageInput").value.trim();
  if (!msg) return;
  rooms[currentRoom].messages.push(`${currentUser}: ${msg}`);
  document.getElementById("messageInput").value = "";
  stopTyping();
  updateChat();
}

function updateChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = rooms[currentRoom].messages.map(m => `<div>${m}</div>`).join("");
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateUsers() {
  const userList = document.getElementById("userList");
  userList.innerText = rooms[currentRoom].users.join("، ");
}

function handleTyping() {
  rooms[currentRoom].typing[currentUser] = true;
  showTypingStatus();
}

function stopTyping() {
  rooms[currentRoom].typing[currentUser] = false;
  showTypingStatus();
}

function showTypingStatus() {
  const typingStatus = document.getElementById("typingStatus");
  const typingUsers = Object.entries(rooms[currentRoom].typing)
    .filter(([user, isTyping]) => isTyping && user !== currentUser)
    .map(([user]) => user);

  if (typingUsers.length > 0) {
    typingStatus.innerText = `${typingUsers.join(" و ")} يكتب الآن...`;
  } else {
    typingStatus.innerText = "";
  }
}

function goBackToRoomOptions() {
  document.getElementById("chat-room").style.display = "none";
  document.getElementById("room-options").style.display = "block";
  stopTyping();
  currentRoom = "";
}

function backToOptions() {
  document.getElementById("create-room").style.display = "none";
  document.getElementById("join-room").style.display = "none";
  document.getElementById("room-options").style.display = "block";
}

function goBackToLogin() {
  document.getElementById("room-options").style.display = "none";
  document.getElementById("login-screen").style.display = "block";
  currentUser = "";
}
