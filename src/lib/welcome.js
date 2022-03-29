import { loginMe } from "./login.js";
import { registerMe } from "./register.js";


export function welcomePage () {
  window.location.hash = '#/welcome';
  
 const welcome =document.createElement('div');
                 
  const welcomeView = ` <div class="containerWelcome" id="containerWelcome"> 
          <img src="imagenes/logo-lucchi.png" id="logoWelcome">
          <button class="btn1 login" id="btnLogin" type="submit" >Iniciar Sesión</button> <br>
          <button class="btn2 register" id="btnRegister" type="submit">Registrarse</button>
          </div>
        `;
        welcome.innerHTML=welcomeView

let btnLogin = welcome.querySelector('#btnLogin');
btnLogin.addEventListener('click', () => {
  loginMe();
});

  let btnRegister = welcome.querySelector('#btnRegister');
  btnRegister.addEventListener('click', () =>{
    registerMe()
  });

        
return welcome;
};