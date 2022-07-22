import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// import { getFirestore, doc, setDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
// eslint-disable-next-line import/no-unresolved
import { getFirestore, doc, setDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCdM3Ba63lj2cLq2Af34tLZjEYpKUrWQ7k',
  authDomain: 'socialnetwork-paw.firebaseapp.com',
  projectId: 'socialnetwork-paw',
  storageBucket: 'socialnetwork-paw.appspot.com',
  messagingSenderId: '896414615855',
  appId: '1:896414615855:web:f5b323d429da8e1cd679da',
  // apiKey: 'AIzaSyCTw_N99nGIJjXWFV0Yrwc3z1DOniMBAPI',
  // authDomain: 'pawprotection-855b8.firebaseapp.com',
  // projectId: 'pawprotection-855b8',
  // storageBucket: 'pawprotection-855b8.appspot.com',
  // messagingSenderId: '896421227210',
  // appId: '1:896421227210:web:8f6515899b4d8f98da6233',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(app);

export {
  doc,
  setDoc,
  getFirestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  auth,
  db,
  provider,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider, 
  collection,
  addDoc
};
