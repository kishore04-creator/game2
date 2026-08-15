import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "game2-96839.firebaseapp.com",
  databaseURL: "https://game2-96839-default-rtdb.firebaseio.com",
  projectId: "game2-96839",
  storageBucket: "game2-96839.firebasestorage.app",
  messagingSenderId: "356312186421",
  appId: "1:356312186421:web:f4bb424a3ded543fc53b7c"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {
  db,
  ref,
  push,
  set,
  onValue,
  remove
};