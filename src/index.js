import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
//import { getFirestone } from 'firebase/firestone';


const firebaseConfig = ({
    apiKey: "AIzaSyCTw_N99nGIJjXWFV0Yrwc3z1DOniMBAPI",
    authDomain: "pawprotection-855b8.firebaseapp.com",
    projectId: "pawprotection-855b8",
    storageBucket: "pawprotection-855b8.appspot.com",
    messagingSenderId: "896421227210",
    appId: "1:896421227210:web:8f6515899b4d8f98da6233"
  
});

//const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
 .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });