import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwlKWdGLCZpfIYp_aA3PutYgHrz2xxkbc",
  authDomain: "wall-5f2b4.firebaseapp.com",
  projectId: "wall-5f2b4",
  storageBucket: "wall-5f2b4.appspot.com",
  messagingSenderId: "563300908593",
  appId: "1:563300908593:web:d262eff36248b889c85f10",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const auth = getAuth();
