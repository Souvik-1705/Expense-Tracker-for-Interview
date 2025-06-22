// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz9pJLB7LYeCh0DXfwMU2KgwvdbQArQuk",
  authDomain: "expense-tracker-2-76556.firebaseapp.com",
  projectId: "expense-tracker-2-76556",
  storageBucket: "expense-tracker-2-76556.firebasestorage.app",
  messagingSenderId: "208806407785",
  appId: "1:208806407785:web:b501fed73d1a884ddafcf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);