import { registerUser } from '../index.js';
import { changeRoute } from '../routes/router.js';
// import { changeRoute } from '../routes/router.js';

export const signup = () => {
  const viewSignup = `
   <section class="logo flex">
      <img class="logo-img" src="pictures/paw.png"></img>
      <p class="logo-text">PawProtection</p>
    </section>

    <section class="signup">
      <form class="signup-form-group flex">

        <input type="text" class="signup-name input-paw" placeholder="Nombre" required>
        <input type="text" class="signup-lastName input-paw" placeholder="Apellidos" required>
        <input id="emailSignup" type="email" class="signup-email input-paw" placeholder="Correo" required>
        <input id="passSignup" type="text" class="signup-password input-paw" placeholder="Contraseña" required>
        <div class="signup-errortext"></div>
        <button id="btnSignup" class="signup-btnSignup btn-paw"><a>Registrar</a></button>
        <dialog id="signup-modal" class="signup-modal">
          <img class="check-out" src="pictures/chek-list.png"></img>
          <h2>¡Usuario registrado con éxito!</h2>
          <p>Revise su correo electronico para iniciar sesión</p>
          <button class="signup-closeModal" id="btn-aceptar">Cerrar</button>
        </dialog>
      </form>
        <p class="signup-login-text">¿Ya tienes cuenta?<a href="#/login"><strong class="login-signup-btn"> Inicia sesión.</strong></a></p> 
    </section>
  `;

  const containerSignup = document.createElement('div');
  containerSignup.innerHTML = viewSignup;
  containerSignup.className = 'view-signup';
  

  const btnSignup = containerSignup.querySelector('.signup-btnSignup.btn-paw');
  const email = containerSignup.querySelector('.signup-email');
  const password = containerSignup.querySelector('.signup-password');
  const name = containerSignup.querySelector('.signup-name');
  const lastName = containerSignup.querySelector('.signup-lastName');
  const errorText = containerSignup.querySelector('.signup-errortext');
  const modal = containerSignup.querySelector('.signup-modal');
  const btnCloseModal = containerSignup.querySelector('.signup-closeModal');

  btnSignup.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value !== '' || password.value !== '' || name.value !== '' || lastName.value !== '') {
      registerUser(name.value, lastName.value, email.value, password.value);
      modal.showModal();
    } else {
      errorText.innerHTML = 'Los datos ingresados no son válidos.';
      name.classList.add('errorInput');
      lastName.classList.add('errorInput');
      email.classList.add('errorInput');
      password.classList.add('errorInput');
    }
    btnCloseModal.addEventListener('click', () => {
      modal.close();
      changeRoute('#/login');
    });
  });
  return containerSignup;
};



   














