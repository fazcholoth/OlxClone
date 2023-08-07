import  firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqWiozcqoPSIT53EnwdK8RcUd79fsQHJk",
    authDomain: "olxapp-b7f8c.firebaseapp.com",
    projectId: "olxapp-b7f8c",
    storageBucket: "olxapp-b7f8c.appspot.com",
    messagingSenderId: "188996793466",
    appId: "1:188996793466:web:b01aaf43c3fff2da0e77c3",
    measurementId: "G-LR24CEV484"
  };

  export  default firebase.initializeApp(firebaseConfig)