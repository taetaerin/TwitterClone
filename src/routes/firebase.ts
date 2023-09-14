import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDg0WlBwf3fiZtsi9yIhKDk_04Wjudl3MU",
  authDomain: "twitter-reloaded-b2737.firebaseapp.com",
  projectId: "twitter-reloaded-b2737",
  storageBucket: "twitter-reloaded-b2737.appspot.com",
  messagingSenderId: "343120336231",
  appId: "1:343120336231:web:11dc7bd370ae118da40bc2"
};

const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

