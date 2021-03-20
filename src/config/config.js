import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBwD9FqGShYaVr9McHeeNleG2H7xxfjkBs",
  authDomain: "e-commerce-project-react-softu.firebaseapp.com",
  databaseURL: "https://e-commerce-project-react-softu.firebaseio.com",
  projectId: "e-commerce-project-react-softu",
  storageBucket: "e-commerce-project-react-softu.appspot.com",
  messagingSenderId: "197163523148",
  appId: "1:197163523148:web:e7c43e9f3e0fb073ad68e9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
