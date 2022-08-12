// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAOXbYUZJQgaKiII6ZxfZNuje62lL1RoE",
  authDomain: "anonym-feedback.firebaseapp.com",
  projectId: "anonym-feedback",
  storageBucket: "anonym-feedback.appspot.com",
  messagingSenderId: "796595681205",
  appId: "1:796595681205:web:ecad60cc5fdc4c61f20bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth };