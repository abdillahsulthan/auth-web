import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsXqhQsDBvR0nVOdh126pU_7uFld7CgwY",
  authDomain: "login-zot.firebaseapp.com",
  projectId: "login-zot",
  storageBucket: "login-zot.appspot.com",
  messagingSenderId: "783432525208",
  appId: "1:783432525208:web:2e87f078628a5dae27f7ed",
  measurementId: "G-S9EGPYQXW8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export default app;