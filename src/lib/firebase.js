/* eslint-disable no-unused-vars */
import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// here i want the import seed file
import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyCQFX8iFziMCUrb7D-0Aj9accjaws9DWfc",
  authDomain: "instagram-clone-a4362.firebaseapp.com",
  projectId: "instagram-clone-a4362",
  storageBucket: "instagram-clone-a4362.appspot.com",
  messagingSenderId: "763677714844",
  appId: "1:763677714844:web:64ac109dd06a275c4b8059",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

console.log("firebase:", firebase);

// here is where i want to call the seed file only once
//seedDatabase(firebase);

export { firebase, FieldValue }