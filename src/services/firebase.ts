import { initializeApp } from "firebase/app";   
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5MaAxldnFTgcrNwlUesXZuN6BsZKCv1w",
  authDomain: "karaoke-auth-4c652.firebaseapp.com",
  projectId: "karaoke-auth-4c652",
  storageBucket: "karaoke-auth-4c652.appspot.com",
  messagingSenderId: "737146440339",
  appId: "1:737146440339:web:ae06f60b038906cddc5b66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);