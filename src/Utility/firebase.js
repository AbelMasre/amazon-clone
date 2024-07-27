// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTQA6A_ixnlIU7LldA1ai19qpxYEhY4dk",
  authDomain: "clone-8a4fa.firebaseapp.com",
  projectId: "clone-8a4fa",
  storageBucket: "clone-8a4fa.appspot.com",
  messagingSenderId: "455053865326",
  appId: "1:455053865326:web:2e8fd351b135f47369917f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
