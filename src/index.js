// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import {  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCdM3Ba63lj2cLq2Af34tLZjEYpKUrWQ7k',
  authDomain: 'socialnetwork-paw.firebaseapp.com',
  projectId: 'socialnetwork-paw',
  storageBucket: 'socialnetwork-paw.appspot.com',
  messagingSenderId: '896414615855',
  appId: '1:896414615855:web:f5b323d429da8e1cd679da',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);
const auth = getAuth();
// const db = getFirestore(app);

// creacion de nuevo usuario a nuestra app con correo y contraseña.
export const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // eslint-disable-next-line no-console
      console.log(user);
      // ...
      verification();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);// eslint-disable-next-line no-alert
      alert(errorCode, errorMessage);
    });
};


 //metodo de acceso a usuario existente


export const userExiting = (email, password) =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
};

// colocando el observador para saber cuando el usuario ingresa a nuestra web.

export const observerUser = (email, password) =>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("este usuario esta activo");
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    console.log("no existe este usuario");
    // User is signed out
    // ...
    }
    })
};

observerUser();

// funcion para verificar si el email es valido

export function verification(){
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
        // Email verification sent!
        // ...
     console.log("enviando correo...")
  });

}