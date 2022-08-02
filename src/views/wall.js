













































































































































































































// esta es mi version revisar en la oh.
/*import { exit, saveComment, deleteComment, getComment, updateComment } from '../index.js';
import { auth, collection, db, doc, getDocs } from '../firebase.js';


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
  const imageUser = containerWall.querySelector('.user-img');
  let editStatus = false;
  let id = "";
  
    
  //const createDiv = containerWall.querySelector('.published-posts flex');
 

  greeting.innerHTML = `¡Hola, ${auth.currentUser.displayName}!`;
  imageUser.src = 'https://lh3.googleusercontent.com/a-/AFdZucqj06YGvKNUL7uMt3ivzJDPzGk7wk1ndH5xSgVcAQ=s96-c';
  console.log(auth.currentUser.photoURL);
  

  function firstLoad() {
    const colRef = collection(db, 'comments');
    let posts = [];
    getDocs(colRef)
      .then((onSnapshot) => {
        publishedPostsContainer.innerHTML = "";
        onSnapshot.docs.forEach((document) => {
          //posts.push({ ...doc.data(), id: doc.id });
          posts.push({ 
            name: document.data().name,
            post: document.data().comment,
            id: document.id, 
            date: document.data().date});
          //createDivs(document.data().comment, document.data().name);
           const printPost = `
          <section class="post flex">
            <div class="container-post-name">${document.data().name}</div>
          </section>

          <section id = container-comments>
            <div class="container-post" id="container-post">${document.data().comment}</div> 
            <button class="btn-edit" data-id="${document.id}">Editar</button>
            <button class="btn-delete" data-id="${document.id}">Eliminar</button>
           </section>
           
          <div class="containerLikes">
             <img class="published-posts-likes-img" src="pictures/heart.png"></img>
             <p class="published-posts-likes-number">30</p>
          </div>`;

         publishedPostsContainer.innerHTML += printPost;
       
        });
        const deletePost = publishedPostsContainer.querySelectorAll('.btn-delete');
        deletePost.forEach( btn =>{
         btn.addEventListener('click', ({target:{dataset}}) =>{
           const confirmDelete = confirm ("Estas seguro de eliminar este post");
           if(confirmDelete === true){
            deleteComment(dataset.id);
            console.log(deleteComment);

           }
         }); 
        });

        const editPost = publishedPostsContainer.querySelectorAll('.btn-edit');  
          editPost.forEach (btn =>{
             btn.addEventListener('click', async (e) =>{
              console.log(editPost);
              const doc = await getComment(e.target.dataset.id)
              const docEdit= doc.data();

              commentPost.value = docEdit.comment
              editStatus = true;
              id = e.target.dataset.id;

             })
          })
         
      
      });   
  };

  firstLoad();
  

  btnPostComment.addEventListener('click', () => {
    if (commentPost.value !== '') {
      //createDivs(commentPost.value, auth.currentUser.displayName);

      if (!editStatus){
        saveComment(commentPost.value, auth.currentUser.displayName);
      }else{
        updateComment( id,
          {comment : commentPost.value})
        editStatus = false;
      }
      
      firstLoad();

      commentPost.value = '';
    }
  });

  btnSignOut.addEventListener('click', () => {
    exit();
  });
 

  return containerWall;
  };
  
*/
   // greeting.innerHTML = `¡Hola, ${localStorage.getItem('nameUser')}!`;
  // console.log(auth.currentUser.email);
  // getName();
 /* function handlingLikes(active) {
    let counter = 0;
    if (active === true) {
      counter++;
    } else {
      counter--;
    }
    return counter;
  }
*/
// revisar con jannery para eliminar esto
  /*function createDivs(post, name) {
    const containerName = document.createElement('div');
    const containerPost = document.createElement('div');
    const containerLikes = document.createElement('div');
    const imgLikes = document.createElement('img');
    const countLikes = document.createElement('p');
    containerName.innerHTML = name;
    containerPost.innerHTML = post;
    // containerPost.appendChild(containerName);
    publishedPostsContainer.appendChild(containerName);
    publishedPostsContainer.appendChild(containerPost);
    containerName.setAttribute('class', 'container-post-name');
    containerPost.setAttribute('class', 'container-post');
    // para los likes
    imgLikes.setAttribute('src', 'pictures/heart.png');
    imgLikes.setAttribute('class', 'published-posts-likes-img');
    containerLikes.setAttribute('class', 'containerLikes');
    countLikes.setAttribute('class', 'published-posts-likes-number');
    containerLikes.appendChild(imgLikes);
    containerLikes.appendChild(countLikes);
    publishedPostsContainer.appendChild(containerLikes);
    imgLikes.addEventListener('click', () => {
      imgLikes.id = 'on';
      if (imgLikes.id === 'on') {
        countLikes.innerHTML = handlingLikes(true);
        imgLikes.id = 'off';
      } else if (imgLikes.id === 'off') {
        countLikes.innerHTML = handlingLikes(false);
        imgLikes.id = 'on';
      }
      // dar y quitar likes usar toggle?
      // countLikes.toggleAttribute(countLikes);
    });
  }
 */