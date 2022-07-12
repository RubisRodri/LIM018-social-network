export const signup = () => {
  const viewSignup = `
    <section class="logo flex">
      <img class="logo-img" src="pictures/paw.png">
      <p class="logo-text">PawProtection</p>
    </section>

    <section class="signup">
      <form class="signup-form-group flex">
        <input type="text" class="signup-name input-paw" placeholder="Nombre">
        <input type="text" class="signup-lastName input-paw" placeholder="Apellidos">
        <input type="text" id="input-email" class="signup-email input-paw" placeholder="Correo">
        <input type="text" id="input-paswoord" class="signup-password input-paw" placeholder="Contraseña">
        <button class="signup-btnSignup btn-paw"><a href="#/login">Registrar</a></button>
      </form>
      <p class="signup-login-text">¿Ya tienes cuenta?<a href="#/login"><strong class="login-signup-btn"> Inicia sesión.</strong></a></p>
    </section>
  `;

  const containerSignup = document.createElement('div');
  containerSignup.innerHTML = viewSignup;
  containerSignup.className = 'view-signup';

  return containerSignup;
};
