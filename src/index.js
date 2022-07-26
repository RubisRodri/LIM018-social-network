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
  Timestamp,
  query,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  user,
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  onSnapshot,
  where,
  getDocs,
  onAuthStateChanged,
  signOut,
  updateProfile,
  //user,
} from './firebase.js';
//import { async } from 'regenerator-runtime';
// eslint-disable-next-line import/no-unresolved


//creamos funcion que permite a los usuarios nuevos registrarse
export const registerUser = (name, lastName, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
       const user = userCredential.user;
       // console.log(user);
       //añadir datos al firestore con diferentes id
       //addDoc(collection(db, 'users'), {
         //Name: name,
         //LastName: lastName,
         //Email: email,
        // Password: password, 
        //});
        //añadir datos al firestore con mismo id
    updateProfile(user,{
      displayName: `${name} ${lastName}`,
    }) .then(() =>{
      //profile update
      //...
    }).catch((error) =>{
      //an error occurred
      //...
    });
      setDoc(doc(db, 'users', user.uid), {
         Name: name,
         LastName: lastName,
         Email: email,
         Password: password, 
        });
      

      // Si el usuario verifico mail puede ingresar al wall
      // (estará comentado porque no tenemos muchos correos reales)
      // sendEmailVerification(auth.currentUser)
      //   .then(() => {
      //     console.log('enviando correo');
      //   });
      console.log(user);
      // termina
      // changeRoute('#/login');
      // return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);// eslint-disable-next-line no-alert
      alert('Los datos ingresados no son válidos.');
      // return error;
    });
};


//funcion iniciar sesion con correo registrado

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = "userCredential".user;
      console.log(user);
      changeRoute('#/wall');
      // if (user.emailVerified) {
      //   changeRoute('#/wall');
      // }
    });


export const registerGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      //const { user } = userCredential;// le estamos dando el valor de usercredential 
      // setDoc(doc(db, 'users', user.uid), {
      //   Name: user.name,
      //   LastName: user.lastName,
      //   Email: user.email,
      // });
      changeRoute('#/wall');
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      //The email of the user's account used.
      //const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};

// funcion para crear una nueva colleccion

export const saveComment = (comment, name) => {
  const date = new Date();
  addDoc(collection(db, 'comments'), {comment, name, date})
};


// funcion para salir

export const exit = () => {
  signOut(auth).then(() => {
    changeRoute('#/login');
  }).catch((error) => {
    console.log(error);
  });
};





// tratando de hacer una base de datos con mas descripciones
/*export const addPost = (name, userId, likes, likesCounter) => {            // Add a new document with a generated id.

  //const date = Timestamp.fromDate(new Date());
  //const name = auth.currentUser.displayName;
  //const userId = auth.currentUser.uid;
  //const likes = [];
  //const likesCounter = 0;
   addDoc(collection(db,'posts'), {name, userId, likes, likesCounter }); //guardamos la coleccion posts
};
*/

//probando para listar la colleccion.

//export const getComment = () => getDocs(collection(db, 'comments'), (comment))
  


/*const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
*/
/*export const readPost = () => {

  const q = query(collection(db, 'comments'), orderBy('date', 'desc'));//query consulta o lee la base de datos de firebase

  const unsubscribe = onSnapshot(q, (querySnapshot) => { //onSnapshot escucha los elementos del documento 
    const comment = [];
    querySnapshot.forEach((doc) => { //QuerySnapshot accede a los objetos que llama de doc por medio del array
      console.log('documentos', doc)
        comment.push(doc.data());
      });
    });
  
  };
*/
// collection ref


//get collection

export const saveWall = () =>{
const colRef = collection(db,'comments')
  getDocs(colRef)
  .then((onSnapshot) =>{
  //console.log(onSnapshot.docs);
  let comentarios =[];
  onSnapshot.docs.forEach((doc) =>{
  comentarios.push({...doc.data(), id:doc.id})
  console.log(comentarios)
  
  })
})
};


/*export const observer = () => {
  onAuthStateChanged(auth, (activeUser) => {
    if (activeUser) {
      // console.log(user);
      const uid = activeUser.uid;
      console.log('Usuario activo', uid);

      // **jalando nombre de firestore
      const docRef = doc(db, 'users', uid);
      const docSnap = getDoc(docRef);
      docSnap
        .then((result) => {
          const nameUser = result.data().Name;
          console.log(nameUser);
          localStorage.setItem('nameUser', nameUser);
          //printTitle();
        })
        .catch((err) => {
         // console.log(err);
          //return err;
        });
      // ** acaá termina

      // if (docSnap.exists()) {
      //   console.log('Document data:', docSnap.data());
      // } else {
      //   // doc.data() will be undefined in this case
      //   console.log('No such document!');
      // }
      // ...
    } else {
      // User is signed out
      console.log('No existe usuario activo');
    }
    // console.log(user);
  });
};
*/