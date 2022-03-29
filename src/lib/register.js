import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {app } from "../firebase.js";
import { login } from "./login.js";



// // ___________________REGISTRARSE___________________
// Función que muestra formulario de registro
export function registerMe() {

  window.location.hash = '#/register';

  const registerV =document.createElement('div');
  
  
  const registerView = `<div class="containerRegister" id="containerRegister">
    <div class="formRegister" id="formRegister">
    <img src="imagenes/logo-lucchi.png" id="logoRegister">
    <label class="labelRegisterMe">Nombre de usuario</label>
    <input class="inputRegisterMe" id="name">
    <label class="labelRegisterMe">Ingresa tu Email</label>
    <input class="inputRegisterMe" id="email" type="email">
    <label class="labelRegisterMe">Ingresa tu contraseña</label>
    <input class="inputRegisterMe" id="password" type="password">
    <p id="mensajeErrorR" class="mensajeErrorR" style="color:red;  font-size: 30px; font-weight: bold; -webkit-text-stroke: 0.5px; text-shadow:1px 1px 10px #fff, 1px 1px 10px #ccc;"> </p>
   
    <button class="buttonRegisterMe" id="btnRegister">Registrarme</button>
    <p class="txtGoogle">O registrar con</p> 
    <button class="buttonRegisterGoogle" id="btnGoogle"> <i class="fa-brands fa-google"></i> Google</button>
    </div>
    </div>`;

    registerV.innerHTML=registerView
    
  // document.getElementById('btnRegister').addEventListener('click', register);
  // document.getElementById('btnGoogle').addEventListener('click', registerGoogle);

  let btnRegisterV = registerV.querySelector('#btnRegister');
  btnRegisterV.addEventListener('click', () => {
    register();
  });
  
    let btnGoogleR = registerV.querySelector('#btnGoogle');
    btnGoogleR.addEventListener('click', () =>{
      registerGoogle()
    });
  

return registerV;
};


export const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export function register() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    check(alert('La cuenta se ha creado exitosamente'))
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
   
    if(errorCode === 'auth/invalid-email'){
      root.querySelector("#mensajeErrorR").innerHTML = "Email Invalido";
    }else if(errorCode === 'auth/invalid-email'){
      root.querySelector("#mensajeErrorR").innerHTML = "Email Invalido";
    } else if(errorCode === 'auth/missing-email'){
      root.querySelector("#mensajeErrorR").innerHTML = "Ingresar Email";
     } else if(errorCode === 'auth/internal-error'){
      root.querySelector("#mensajeErrorR").innerHTML = "Rellene todos los campos";
     } else if(errorCode === 'auth/weak-password'){
      root.querySelector("#mensajeErrorR").innerHTML = "La contraseña debe tener mas 6 caracteres";
    }
    
});
}


export const registerGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        // The email of the user's account used.
        const email = error.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
      });
  };


// //----Enviar correo de validación de Google -----
// function emailVerification(auth) {
//     sendEmailVerification(auth.currentUser)
//       .then(() => {
//         // Email verification sent!
//         // ...
//       });
//   }