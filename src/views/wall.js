import { exit, saveComment, deletePost, updatePost } from '../index.js';
import { auth, collection, db, getDocs, Timestamp } from '../firebase.js';

export const wall = () => {
  const viewWall = `
    <header class="header-wall flex-wall">
      <section class="logo-wall flex-wall">
        <img class="logo-img logo-img-wall" src="pictures/paw.png">
        <p class="logo-text">PawProtection</p>
      </section>
      <a class="btn-exit">Salir</a>
    </header>

    <section class="user">
      <img class="user-img" src="pictures/user.png"></img>
      <p class="user-text">¡Hola, Guillermo Morgado!</p>
    </section>

    <section class="post flex">
      <textarea name="textarea" class="post-editableText" rows="4" cols="10" placeholder="Cuéntanos..."></textarea>
      <img class="post-btnpost" src="pictures/send.png"></img>
    </section>

    <section class="published-posts flex">
       <div class="published-posts-container">
          <div class="published-posts-box">
          </div>
        </div>
     </section>   
  `;

  //observer();
  const containerWall = document.createElement('div');
  containerWall.innerHTML = viewWall;
  containerWall.className = 'view-wall';
  

  const btnSignOut = containerWall.querySelector('.btn-exit');
  const greeting = containerWall.querySelector('.user-text');
  const commentPost = containerWall.querySelector('.post-editableText');
  const btnPostComment = containerWall.querySelector('.post-btnpost');
  const publishedPostsContainer = containerWall.querySelector('.published-posts-container');
  const imageProfile = containerWall.querySelector('.user-img');

  let editStatus = false;
  let likeStatus = false;

  greeting.innerHTML = `¡Hola, ${auth.currentUser.displayName}!`;
  imageProfile.src = auth.currentUser.photoURL;
  // greeting.innerHTML = `¡Hola, ${localStorage.getItem('nameUser')}!`;
  // console.log(auth.currentUser.email);
  // getName();
  firstLoad();

  function createDivs(postData) {
    // traerme los likes del post y mostrar su cantidad****listo
    // agregar un listener al evento de click del boton de like para ****listo
    // cuando le de click al boton aumente el numero de likes.
    //  1. si la usuaria conectada no le ha dado like antes, se agregue su id al array de likes
    //  2. si la usaurio conectada ya le dio like, se quita su id del array de likes
    // se debe actualizar el post en firestore con el nuevo arreglo de likes resultante 
    const idPost = postData.id
    const name = postData.name
    const post = postData.comment
    const likes = postData.likes ?? []
    //console.log(typeof likes)
    console.log(likes)
    let likesQty = likes.length
    
    
    const container = document.createElement('div');
    const containerName = document.createElement('div');
    const containerPost = document.createElement('textarea');
    // Variables para likes
    const containerLikes = document.createElement('div');
    const imgLikes = document.createElement('img');
    const countLikes = document.createElement('p');
    // Variables para editar
    const btnEdit = document.createElement('button');
    const btnEditText = document.createTextNode('Editar');
    btnEdit.appendChild(btnEditText);
    const btnDelete = document.createElement('button');
    const btnDeleteText = document.createTextNode('Eliminar');
    btnDelete.appendChild(btnDeleteText);

    containerName.innerHTML = name;
    containerPost.innerHTML = post;
    containerPost.appendChild(containerName);
    container.appendChild(containerName);
    container.appendChild(containerPost);
    // publishedPostsContainer.appendChild(containerName);
    // publishedPostsContainer.appendChild(containerPost);
    containerName.setAttribute('class', 'container-post-name');
    containerPost.setAttribute('class', 'container-post');
    containerPost.setAttribute('disabled', true);
    container.setAttribute('id', idPost);
    // para los likes
    imgLikes.setAttribute('src', 'pictures/heart.png');
    imgLikes.setAttribute('class', 'published-posts-likes-img');
    containerLikes.setAttribute('class', 'containerLikes');
    countLikes.setAttribute('class', 'published-posts-likes-number');
    btnEdit.setAttribute('class', 'btn-edit-post');
    btnEdit.setAttribute('data-id', idPost);
    btnDelete.setAttribute('class', 'btn-delete-post');
    btnDelete.setAttribute('data-id', idPost);
    containerLikes.appendChild(imgLikes);
    containerLikes.appendChild(countLikes);
    containerLikes.appendChild(btnEdit);
    containerLikes.appendChild(btnDelete);
    // publishedPostsContainer.appendChild(containerLikes);
    container.appendChild(containerLikes);
    publishedPostsContainer.appendChild(container);
    countLikes.innerHTML = likesQty ;

    btnDelete.addEventListener('click', (event) => {
      deletePost(event.target.dataset.id);
      publishedPostsContainer.removeChild(container);
    });

    btnEdit.addEventListener('click', (e) => {
      if (!editStatus) {
        containerPost.disabled = false;
        btnEdit.innerHTML = 'Actualizar';
        editStatus = true;
      } else {
        updatePost(e.target.dataset.id, { comment: containerPost.value });
        containerPost.disabled = true;
        btnEdit.innerHTML = 'Editar';
        editStatus = false;
      }
    });
    
   // esto es de Janne**** 
    imgLikes.addEventListener('click', () => {
      
      const isincluded = likes.includes(auth.currentUser.uid);

      if( isincluded ){
        //sacar en la posicion especifica de un arreglo

      }else{
        likes.push(auth.currentUser.uid)
        likesQty++


      }
      
      updatePost( idPost, {likes:likes, likesCounter:likesQty}) 
        
      
       
      
      // countLikes.toggleAttribute(countLikes);
    });
  }
     /* Evento para dar likes
  const likeButton = containerEmpty.querySelectorAll('.btn-like');//tomamos el valor del selector
  likeButton.forEach((e) => {
    e.addEventListener('click', () => {
      const likeValue = e.value;
      const userId = auth.currentUser.uid;
      likePost(likeValue, userId);//guardamos los parametros para entregarselos a las funciones de index.js
    });
  }); 

  */





  function firstLoad() {
    const colRef = collection(db, 'comments');
    let posts = [];
    getDocs(colRef)
      .then((onSnapshot) => {
        onSnapshot.docs.forEach((document) => {
          const commentData = { id: document.id, ...document.data() };
          // posts.push({ ...doc.data(), id: doc.id });
          posts.push({ name: commentData.name, post: commentData.comment });
          createDivs(commentData);
        });
      });
  }

  btnPostComment.addEventListener('click', () => {
    if (commentPost.value !== '') {
      const date = Timestamp.fromDate(new Date());
      const userId = auth.currentUser.uid;
      const likes = [];
      const likesCounter = 0;
        saveComment(commentPost.value, auth.currentUser.displayName, date, userId, likes,likesCounter)
          .then((result) => {
            createDivs(commentPost.value, auth.currentUser.displayName, result.id);
            commentPost.value = '';
            console.log(result.id);
          });
      }
  });

  btnSignOut.addEventListener('click', () => {
    exit();
  });

  return containerWall;
};
