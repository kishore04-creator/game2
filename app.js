import {
  db,
  ref,
  push,
  set,
  onValue
} from "./firebase.js";

let currentRoom = "";
let currentUser = "";

const createRoomBtn = document.getElementById("createRoomBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const sendBtn = document.getElementById("sendBtn");

const usernameInput = document.getElementById("username");
const roomInput = document.getElementById("roomCode");
const messageInput = document.getElementById("messageInput");

const chatMessages = document.getElementById("chatMessages");

/* Create Room */

createRoomBtn.addEventListener("click", () => {

    currentUser = usernameInput.value.trim();

    if (!currentUser) {
        alert("Enter your name");
        return;
    }

    currentRoom = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    roomInput.value = currentRoom;

    alert(
        "Room Created!\nInvite Code: " +
        currentRoom
    );

    loadMessages();
});

/* Join Room */

joinRoomBtn.addEventListener("click", () => {

    currentUser = usernameInput.value.trim();
    currentRoom = roomInput.value.trim();

    if (!currentUser || !currentRoom) {
        alert("Enter name and room code");
        return;
    }

    loadMessages();

    alert(
        "Joined Room: " +
        currentRoom
    );
});

/* Send Message */

sendBtn.addEventListener("click", () => {

    const msg = messageInput.value.trim();

    if (!msg || !currentRoom) return;

    push(
        ref(
            db,
            "rooms/" +
            currentRoom +
            "/messages"
        ),
        {
            user: currentUser,
            text: msg,
            time: Date.now()
        }
    );

    messageInput.value = "";
});

/* Load Messages */

function loadMessages() {

    const msgRef = ref(
        db,
        "rooms/" +
        currentRoom +
        "/messages"
    );

    onValue(msgRef, snapshot => {

        chatMessages.innerHTML = "";

        const data = snapshot.val();

        if (!data) return;

        Object.values(data).forEach(msg => {

            const div =
                document.createElement("div");

            div.className = "message";

            div.innerHTML =
                "<b>" +
                msg.user +
                "</b>: " +
                msg.text;

            chatMessages.appendChild(div);
        });

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    });
}