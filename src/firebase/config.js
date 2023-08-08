import * as firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9cTm1E6xaxuw1kyJ4o4koGcd32MdmMcc",
  authDomain: "rn-social-5e825.firebaseapp.com",
  projectId: "rn-social-5e825",
  storageBucket: "rn-social-5e825.appspot.com",
  messagingSenderId: "775165926587",
  appId: "1:775165926587:web:6d4d8c77e5d7dc818e1d9e",
  measurementId: "G-86J1Q21Y59"
};

export default firebase.initializeApp(firebaseConfig);