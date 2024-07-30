// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqNld6V8mdbsA_pHq60VlT6Oxl2z9sNxE",
  authDomain: "digafrica-ae73c.firebaseapp.com",
  projectId: "digafrica-ae73c",
  storageBucket: "digafrica-ae73c.appspot.com",
  messagingSenderId: "1032026827511",
  appId: "1:1032026827511:web:2ee876d21b133c056d81f2",
  measurementId: "G-RNXJ50DP2G",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app)


export {db,storage,auth};
