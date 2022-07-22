// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-cycle
import { changeRoute } from './routes/router.js';
import {
  doc,
  setDoc,
  getFirestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  auth,
  db, 
  provider,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  collection,
  addDoc
} from './firebase.js';
// eslint-disable-next-line import/no-unresolved

//creamos funcion que permite a los usuarios nuevos registrarse
export const registerUser = (name, lastName, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // eslint-disable-next-line no-console
      // console.log(user);
      // Añadir datos al firestore con diferente ID
      // addDoc(collection(db, 'users'), {
      //   Name: name,
      //   LastName: lastName,
      //   Email: email,
      //   Password: password,
      // });
      // Añadir datos al firestore con mismo ID
      setDoc(doc(db, 'users', user.uid), {
        Name: name,
        LastName: lastName,
        Email: email,
        Password: password,
      });

      // Si el usuario verifico mail puede ingresar al wall
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('enviando correo');
        });
      console.log(user);

      // termina
      // changeRoute('#/login');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);// eslint-disable-next-line no-alert
      alert('Los datos ingresados no son válidos.');
    });
};



 //metodo de acceso a usuario existente


 /*export const userExiting = (email, password) =>{
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
*/
// colocando el observador para saber cuando el usuario ingresa a nuestra web.


export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
     // console.log(user);
      if (user.emailVerified) {
        changeRoute('#/wall');
      } else {
        alert('Aún no has verificado tu correo electrónico.');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Usuario y/o contraseña incorrectos.');
    });
};

//observador de usuarios activos

export const observer = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('Usuario activo');
        changeRoute('#/login');
        // ...
      } else {
        // User is signed out
        console.log('No existe usuario activo');
      }
    });
  
};

observer();



// comenzando con la autorizacion con google.
 
export const registerGoogle = () => {
    signInWithPopup( auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        changeRoute('#/wall');
        console.log(user.displayName);
       // console.log(nameUsuario);
        return user;

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("este es un mensaje de error");
      })
    
};   

  console.log(nameUsuario);



  /*export const datosUser = () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  */
