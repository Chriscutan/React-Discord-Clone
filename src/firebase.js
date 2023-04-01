import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArTIDS69CPg0ZXr2YIQs5cKFBfY995CFM",
  authDomain: "discord-clone-5114d.firebaseapp.com",
  projectId: "discord-clone-5114d",
  storageBucket: "discord-clone-5114d.appspot.com",
  messagingSenderId: "809470904529",
  appId: "1:809470904529:web:5c10ab152b7d7d79d7ddf0",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();
const channelsRef = collection(db, "channels");

export { auth, provider, db, channelsRef };
