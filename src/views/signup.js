import { registerUser } from '../index.js';

export const signup = () => {
  const viewSignup = `
   <section class="logo flex">
      <img class="logo-img" src="pictures/paw.png"></img>
      <p class="logo-text">PawProtection</p>
    </section>

    <section class="signup">
      <form class="signup-form-group flex">
          <input type="text" name="name" class="signup-name input-paw" placeholder="Nombre" required>
          <input type="text" name="lastname" class="signup-lastName input-paw" placeholder="Apellidos" required>
          <input id="emailSignup" name="email" type="email" class="signup-email input-paw" placeholder="Correo" required>
          <input id="passSignup" name="password" type="text" class="signup-password input-paw" placeholder="Contraseña" required>
          <button id="btnSignup" class="signup-btnSignup btn-paw"><a href="#/login">Registrar</a></button>
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
  //creacion del modal
  const modal = containerSignup.querySelector(".signup-modal");
  const btnCloseModal = containerSignup.querySelector(".signup-closeModal");
  
    btnSignup.addEventListener("click", (e) =>{
      e.preventDefault();
      
      console.log(modal);
      console.log(email);
      if (email.value.length !== 0) { 

      registerUser(name.value, lastName.value, email.value, password.value);
      modal.showModal();

      } else {
        
        alert('No puedes dejar los campos vacios');
        };
        // evento para cerrar el modal
        btnCloseModal.addEventListener("click", () =>{
          modal.closeModal();
       });
    });
   
 return containerSignup;
};



   














