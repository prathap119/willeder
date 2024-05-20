import { firestore } from 'firebase-admin';
import admin from 'firebase-admin';

import devConfig from './serviceAccounts/firebase-dev.json';
import prodConfig from './serviceAccounts/firebase-prod.json';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
// const config = process.env.NODE_ENV === 'production';

if (typeof window !== 'undefined') {

  const analytics = getAnalytics();
} else {
  // This block will execute in non-browser environments (e.g., Node.js)
  console.log("Firebase Analytics code skipped because 'window' is not defined.");
}
admin.initializeApp({
  credential: admin.credential.cert(config),
});

const db = firestore();
const adminauth = admin.auth();

export { db, adminauth };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "SG.AIzaSyBrZ3FM3lbnAX6-F1F-Kb6eq8U8zHTx6dE",
//   authDomain: "willeder-23ed0.firebaseapp.com",
//   projectId: "willeder-23ed0",
//   storageBucket: "willeder-23ed0.appspot.com",
//   messagingSenderId: "775488660639",
//   appId: "1:775488660639:web:785670f170cdea19062eaa",
//   measurementId: "G-YCD7735TMR"
// };
const firebaseConfig = {

"apiKey": "SG.AIzaSyDNrzbdQDWHs0OH9Wgn2SxUiRmArV6iaZA",
"authDomain": "node-task-23e5e.firebaseapp.com",
"projectId": "node-task-23e5e",
"storageBucket": "node-task-23e5e.appspot.com",
"messagingSenderId": "977391925475",
"appId": "1:977391925475:web:404ce1a6c2542082fc6dd6",
"measurementId": "G-S9DEWB1MHG"}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);