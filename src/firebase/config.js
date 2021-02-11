import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDcO--TgNUMmEUEWk7xSDirK4zixRINXDA",
    authDomain: "abzolute-leave.firebaseapp.com",
    databaseURL: "https://abzolute-leave.firebaseio.com",
    projectId: "abzolute-leave",
    storageBucket: "abzolute-leave.appspot.com",
    messagingSenderId: "408907331413",
    appId: "1:408907331413:web:e108b6cbbfdf5cf33d21dc"
  };
  // Initialize Firebase
  export const firestore = firebase.initializeApp(firebaseConfig).firestore();
  export const auth = firebase.auth();

