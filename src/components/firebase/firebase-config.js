import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

 // Your web app's Firebase configuration
 const  firebaseConfig = {
    apiKey: "AIzaSyBxb6h0mnFfNZ_S8tg6JeFtvhpL3OBCyKo",
    authDomain: "react-app-3c002.firebaseapp.com",
    projectId: "react-app-3c002",
    storageBucket: "react-app-3c002.appspot.com",
    messagingSenderId: "554714064419",
    appId: "1:554714064419:web:19bf6dcda73198a8487396"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }