// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB6J9EvWTSJz0KMEdtvyIqrBUmRWRg5n3w',
  authDomain: 'daisukekaraoke-auth.firebaseapp.com',
  projectId: 'daisukekaraoke-auth',
  storageBucket: 'daisukekaraoke-auth.appspot.com',
  messagingSenderId: '348208515791',
  appId: '1:348208515791:web:0492ae073319f09d2445ba',
  measurementId: 'G-W3WM1VDRTF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
