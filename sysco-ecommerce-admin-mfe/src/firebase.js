// src/firebase.js
/*import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgi2RJAMUGy9aa7866l-pc2UrGec086Hk",
  authDomain: "summit-87ddb.firebaseapp.com",
  projectId: "summit-87ddb",
  storageBucket: "summit-87ddb.appspot.com",
  messagingSenderId: "422121745568",
  appId: "1:422121745568:web:a0c9523e837fefb4ffedc5",
  measurementId: "G-YW5DKCV7TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the storage service
export const imageDb = getStorage(app);
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdoRQLIVBCoR9RXRDD4vz48JKNs_qzOyA",
  authDomain: "trivia-18f82.firebaseapp.com",
  projectId: "trivia-18f82",
  storageBucket: "trivia-18f82.appspot.com",
  messagingSenderId: "499335176871",
  appId: "1:499335176871:web:662b12155609f4648bf182",
  measurementId: "G-T5P16Y7KP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const imageDb = getStorage(app);