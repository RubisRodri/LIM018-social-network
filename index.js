// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-cycle
import {
  doc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  db,
  signInWithPopup,
  provider,
  //user,
  collection,
  signOut,
  addDoc,
  updateDoc,
  orderBy,
  query,
  deleteDoc,
} from "./firebase.js";
// eslint-disable-next-line import/no-unresolved, max-len

// funcion para que el usuario se registre por primera vez
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// funcion para pueda iniciar sesion un usuario registrado
export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// funcion para que pueda registrarse e ingresar con google
export const registerGoogle = () => signInWithPopup(auth, provider);

//funcion para que se guarden los comentarios que realizo en el post
export const saveComment = (comment, name, date, userId, likes, likesCounter) =>
  addDoc(collection(db, "comments"), {
    comment,
    date,
    name,
    userId,
    likes,
    likesCounter,
  });

// para ordenar los datos.

//export const q = query(commentRef, orderBy ("date"))

// Funcion para editar datos
export const updatePost = (id, newInput) =>
  updateDoc(doc(db, "comments", id), newInput);

// Funcion para eliminar datos
export const deletePost = (id) => deleteDoc(doc(db, "comments", id));

// funcion para salir
export const exit = () => signOut(auth);
