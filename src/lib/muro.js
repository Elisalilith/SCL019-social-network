import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { app, guardarTask, mostrarTask, onGetTask, deletePost, editPost, updatePost } from "../firebase.js";


export function muroPage() {

  window.location.hash = '#/muro';

  const muroV = document.createElement('div');


  const muroView = `<div class="containerMuro" id="containerMuro">
     <header class="encabezadoMuro" id="encabezadoMuro">
      <img src="/imagenes/logo-lucchi-H.png" id="logoMuro" class="logoMuro">
      <button class="logOut" id="btnLogOut"><i class="fa-solid fa-power-off"></i> </button>
     </header>
     <div class="mainPost" id="mainPost">
     <section class="categoryHome" id="categoryHome">
     <button class="categoryFood" id="btnfood"> <i class="fa-solid fa-paw"></i> <br> Alimentacion</button>
     <button class="categoryclean" id="categoryclean"> <i class="fa-solid fa-paw"></i><br> Higine</button>
     <button class="categoryVet" id="categoryVet"> <i class="fa-solid fa-paw"></i> <br>Veterinario</button>
     <button class="categoryGo" id="categoryGo"> <i class="fa-solid fa-paw"></i><br>Paseo</button>
     <button class="categoryPlay" id="categoryPlay"> <i class="fa-solid fa-paw"></i> <br>Juegos</button>
     <button class="categoryAcc" id="categoryAcc"> <i class="fa-solid fa-paw"></i> <br>Accesorios</button>
     </section>

     <section class="containerPost" id="containerPost">

     <form id="task-form" class="task-form">
      <label for="title"> Titulo: </label>
      <input type="text" class="taskTittle" id="task-title">
      
      
      <br>
      <label for="title"> Descripción: </label>
      <textarea class="taskDescription" id="task-description" cols="15" rows="6"></textarea>
      <br>
    
      
      <button id="btnTask" class="btnTask"> Postear </button>

      </form>

      <div class="containerTask" id="containerTask"></div>
    
      <div >
        <h3></h3>
        <p></p>
     </div>

     </section>
     </div>
      
      
      
      </div>`;

  muroV.innerHTML = muroView





  let editStatus = false;
  let id = '';

  /* fUNCION PARA MOSTRAR POST EN TIEMPO REAL */
  const containerPost = muroV.querySelector('#containerTask')

  async function mostrarPost() {
    onGetTask((querySnapshot) => {
      let html = ''

      querySnapshot.forEach(doc => {
        const task = doc.data();
        html += `
              <div class="post1">
                 <h3 class="titulo">${task.titulo}</h3> 
                 <i class="fa-solid fa-ellipsis"></i>
                 <textarea class="comentario" readonly>${task.descripcion}</textarea>

                 <div class="like">
            
                 <input class="contador" id="${doc.id}" type="number"  value="0" name="" readonly/>


                 <button class="heart"  data-id="${doc.id}"><i class="fa-regular fa-heart"></i></button> 
                 <button class="btnDelete" data-id="${doc.id}">Borrar</button>
                 <button class="btnEdit" data-id="${doc.id}">Editar</button>
                 </div>

              </div>
            `;
      });
      containerPost.innerHTML = html;

      let likebtn = containerPost.querySelectorAll(".heart");
      let contador = containerPost.querySelector(".contador");

      console.log(likebtn);

      likebtn.forEach(btn => {
        btn.addEventListener("click", ({ target: { dataset } }) => {
        
          contador.value = parseInt(contador.value) + 1;
          contador.style.color = "#de264c";
          console.log(dataset.id);
        })
      })




      //const likebtn= muroV.querySelectorAll("#heart");
      //const contador= muroV.querySelectorAll("#contador");
      ////likebtn.forEach(btn =>{
      //btn.addEventListener("click",() => {
      //contador.value= parseInt(contador.value)+1;
      //contador.style.color= "#de264c";
      //})
      //})


      /*FUNCION BORRAR POST */
      const btnsDelete = containerPost.querySelectorAll('.btnDelete')
      btnsDelete.forEach(btn => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deletePost(dataset.id)
        });
      });

      /*FUNCION PARE EDITAR POST */

      const btnsEdit = containerPost.querySelectorAll('.btnEdit')
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const doc = await editPost(e.target.dataset.id)
          const task = doc.data()

          formulario["task-title"].value = task.titulo
          formulario["task-description"].value = task.descripcion


          editStatus = true;
          id = doc.id;

          formulario['btnTask'].innerText = 'update'
        });
      });

    });

  };

  mostrarPost()


  /* FUNCION PARA GUARDAR POST Y RESET FORMULARIO*/
  let formulario = muroV.querySelector('#task-form');

  formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const titulo = formulario["task-title"]
    const descripcion = formulario["task-description"]


    if (!editStatus) {
      guardarTask(titulo.value, descripcion.value);
    } else {
      updatePost(id, {
        titulo: titulo.value,
        descripcion: descripcion.value,
      });

      editStatus = false;
    }

    formulario.reset();
  });



  let btnSalirV = muroV.querySelector('#btnLogOut');
  btnSalirV.addEventListener('click', () => {
    logOut();
  });


  return muroV;
};


const auth = getAuth(app);



// cerrar sesion
function logOut() {
  signOut(auth).then(() => {
    alert("Usted esta cerrando sesión, tome awita ✌🏻");
    window.location.hash = '#/welcome';
  }).catch((error) => {

  });
};



