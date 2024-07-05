import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLlAUbrc4IP_Igb9LHlFH2Kf9yUx2y6YU",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "rascal-database",
  storageBucket: "gs://rascal-database.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

console.log("Firebase initialized:", app);
console.log("Firestore initialized:", db);
console.log("Storage initialized:", storage);
console.log("Auth initialized:", auth);

export { db, storage, auth, onAuthStateChanged };
