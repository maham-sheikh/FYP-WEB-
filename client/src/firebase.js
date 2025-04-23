import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0znt4vL-Yme-9SybDBtJLJstofjsWLkU",
  authDomain: "findigo-1bded.firebaseapp.com",
  projectId: "findigo-1bded",
  storageBucket: "findigo-1bded.appspot.com",
  messagingSenderId: "334746102551",
  appId: "1:334746102551:web:5f321acc831a14296be552"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
