// Este es el punto de entrada de tu aplicacion
// import { login } from './views/login.js';
import { changeRoute } from './routes/router.js';

const init = () => {
  // window.location.host = document.getElementById('root').appendChild(login());
  changeRoute(window.location.hash);
  window.addEventListener('hashchange', () => {
    // document.getElementById('root').appendChild(login()); //sería en caso si tuvieramos navbar
    changeRoute(window.location.hash);
  });
};

window.addEventListener('load', init());

// comenzando con el proceso de autenticacion de usuario

const signupForm = document.querySelector('.signup-btnSignup btn-paw');
signupForm.addEventListener("click", (e) => {
  
   const email= document.getElementById('input-email');
   const password= document.getElementById('input-paswoord');
   //const modal = document.getElementById('modal');
    console.log("hola");
   });
   