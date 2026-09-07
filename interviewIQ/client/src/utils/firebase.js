// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-603ea.firebaseapp.com",
  projectId: "interviewiq-603ea",
  storageBucket: "interviewiq-603ea.firebasestorage.app",
  messagingSenderId: "947596702523",
  appId: "1:947596702523:web:7fe9c1587fb8e0e2b63d1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth,provider}