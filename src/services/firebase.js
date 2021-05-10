import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCZQLlZC-uMgD33smnlaRRGs87nF2eRKkA",
    authDomain: "chat-app-c6525.firebaseapp.com",
    databaseURL: "https://chat-app-c6525-default-rtdb.firebaseio.com",
    projectId: "chat-app-c6525",
    storageBucket: "chat-app-c6525.appspot.com",
    messagingSenderId: "467584702309",
    appId: "1:467584702309:web:ee9fbec4d43e5fa2e3738c",
    measurementId: "G-49N333VDM1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  export const auth = firebase.auth;
  export const db = firebase.database()
