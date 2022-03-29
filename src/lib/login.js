import { getAuth, signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { app } from "../firebase.js";
import { registerGoogle } from "./register.js";
import { muroPage } from "./muro.js";


// // ___________________REGISTRARSE___________________
// Función que muestra formulario de registro
export function loginMe() {
    window.location.hash = '#/login';

    const loginV =document.createElement('div');
   const loginView = ` <div class="containerLogin" id="containerLogin"> 
    <div class="formlogin" id="formlogin">
    <img src="imagenes/logo-lucchi.png" id="logoLogin">
    <label class="labelLoginMe">Ingresa tu Email</label>
    <input class="inputLoginMe" id="email" type="email">
    <label class="labelLoginMe">Ingresa tu contraseña</label>
    <input class="inputLoginMe" id="password" type="password"><br>


    <p class="mensajeErrorL" id="mensajeErrorL" style="color:red;  font-size: 30px; font-weight: bold; -webkit-text-stroke: 0.5px ; text-shadow:1px 1px 10px #fff, 1px 1px 10px #ccc;"> </p>

   
    <button class="buttonLoginMe" id="btnLogin">Iniciar sesión</button>
    <p class="txtGoogle">O iniciar sesión con</p> 
    <button class="buttonLoginGoogle" id="btnGoogleLogin"><i class="fa-brands fa-google"></i> Google</button>
    </div>  
    </div>
      `;
      loginV.innerHTML=loginView
  
    let btnLoginV = loginV.querySelector('#btnLogin');
    btnLoginV.addEventListener('click', () => {
    login();
});
    
    let btnGoogleL = loginV.querySelector('#btnGoogleLogin');
    btnGoogleL.addEventListener('click', () => {
  registerGoogle();
});

    return loginV;
  }
  


const auth = getAuth(app);


export function login() {
    let emailLogin = document.getElementById('email').value;
    let passwordLogin = document.getElementById('password').value;

signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
      console.log(user);


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  

    if (errorCode === "auth/user-not-found"){
      root.querySelector("#mensajeErrorL").innerHTML = "usuario no regristrado";
      
    } else if (errorCode === "auth/wrong-password"){
      root.querySelector("#mensajeErrorL").innerHTML = "Contraseña incorrecta";
    }
      else if (errorCode === "auth/invalid-email"){
      root.querySelector("#mensajeErrorL").innerHTML= "Correo invalido";
    }
      else if (errorCode === "auth/internal-error"){
      root.querySelector("#mensajeErrorL").innerHTML= "Ingrese contraseña";
    }

  });
}



export const observer = () => {
onAuthStateChanged(auth, (user) => {
  if ((user !== null || undefined) && user.emailVerified === true) {

    const uid = user.uid;
    muroPage()

  } else if (window.location.hash === '#/login'){
    // User is signed out
    loginMe()

  }
});
};