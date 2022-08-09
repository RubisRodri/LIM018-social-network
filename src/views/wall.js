import { exit, saveComment, deletePost, updatePost } from "../index.js";
import {
  auth,
  collection,
  db,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "../firebase.js";
import { changeRoute } from "../routes/router.js";

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

  
  const containerWall = document.createElement("div");
  containerWall.innerHTML = viewWall;
  containerWall.className = "view-wall";

  const btnSignOut = containerWall.querySelector(".btn-exit");
  const greeting = containerWall.querySelector(".user-text");
  const commentPost = containerWall.querySelector(".post-editableText");
  const btnPostComment = containerWall.querySelector(".post-btnpost");
  const publishedPostsContainer = containerWall.querySelector(
    ".published-posts-container"
  );
  const imageProfile = containerWall.querySelector(".user-img");
 
  let editStatus = false;

  greeting.innerHTML = `¡Hola, ${auth.currentUser.displayName}!`;
  //console.log(auth.currentUser)

  function imageSee(){
   if (auth.currentUser.photoURL === null){
    imageProfile.src = "pictures/user.png";
    } else {
    imageProfile.src = auth.currentUser.photoURL;
  }
}
  imageSee();
  
  // greeting.innerHTML = `¡Hola, ${localStorage.getItem('nameUser')}!`;

  // getName();
  firstLoad();

  function createDivs(postData) {
    const idPost = postData.id;
    const datePost = postData.date;
    //const fecha = new Date();
    //const hour = fecha.toLocaleTimeString();
    //console.log(hour)
    const name = postData.name;
    const post = postData.comment;
    const likes = postData.likes ?? [];
    let likesQty = likes.length;

    const weekDay = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    const monthYear = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const container = document.createElement("div");
    const containerNamePost = document.createElement("div");
    const containerName = document.createElement("div");
    const publicationDate = document.createElement("div");
    const containerPost = document.createElement("textarea");
    // Variables para likes
    const containerLikes = document.createElement("div");
    const imgLikes = document.createElement("img");
    const countLikes = document.createElement("p");
    // Variables para editar
    const btnEdit = document.createElement("button");
    const btnEditText = document.createTextNode("Editar");
    btnEdit.appendChild(btnEditText);
    const btnDelete = document.createElement("button");
    const btnDeleteText = document.createTextNode("Eliminar");
    btnDelete.appendChild(btnDeleteText);

    containerNamePost.innerHTML = name;
    containerPost.innerHTML = post;
    publicationDate.innerHTML = `${
      weekDay[datePost.toDate().getDay()]
    }, ${datePost.toDate().getDate()} de ${
      monthYear[datePost.toDate().getMonth()]
    }
    de, ${datePost.toDate().getFullYear()}`;

    containerPost.appendChild(containerName);
    container.appendChild(containerName);
    container.appendChild(containerPost);
    containerName.append(containerNamePost);
    containerName.append(publicationDate);

    // publishedPostsContainer.appendChild(containerPost);
    container.setAttribute("class", "container-date");
    containerName.setAttribute("class", "container-post-name");
    publicationDate.setAttribute("class", "container-post-date");
    containerNamePost.setAttribute("class", "container-post-namePost");
    containerPost.setAttribute("class", "container-post");
    containerPost.setAttribute("disabled", true);
    container.setAttribute("id", idPost);
    // para los likes
    imgLikes.setAttribute("src", "pictures/heart.png");
    imgLikes.setAttribute("class", "published-posts-likes-img");
    containerLikes.setAttribute("class", "containerLikes");
    countLikes.setAttribute("class", "published-posts-likes-number");
    btnEdit.setAttribute("class", "btn-edit-post");
    btnEdit.setAttribute("data-id", idPost);
    btnDelete.setAttribute("class", "btn-delete-post");
    btnDelete.setAttribute("data-id", idPost);
    containerLikes.appendChild(imgLikes);
    containerLikes.appendChild(countLikes);
    containerLikes.appendChild(btnEdit);
    containerLikes.appendChild(btnDelete);
    // publishedPostsContainer.appendChild(containerLikes);
    container.appendChild(containerLikes);
    publishedPostsContainer.appendChild(container);

    btnDelete.addEventListener("click", (event) => {
      deletePost(event.target.dataset.id);
      publishedPostsContainer.removeChild(container);
    });

    btnEdit.addEventListener("click", (e) => {
      if (!editStatus) {
        containerPost.disabled = false;
        btnEdit.innerHTML = "Actualizar";
        editStatus = true;
      } else {
        updatePost(e.target.dataset.id, { comment: containerPost.value });
        containerPost.disabled = true;
        btnEdit.innerHTML = "Editar";
        editStatus = false;
      }
    });

    countLikes.innerHTML = likesQty;

    imgLikes.addEventListener("click", (e) => {
      e.preventDefault();
      const isIncluded = likes.includes(auth.currentUser.uid);

      if (isIncluded) {
        const foundLike = likes.findIndex((e) => e === auth.currentUser.uid);
        likes.splice(foundLike, 1);
        likesQty--;
        console.log("diste dislike");
      } else {
        likes.push(auth.currentUser.uid);
        likesQty++;
        console.log("diste like");
      }
      countLikes.innerHTML = likesQty;
      updatePost(idPost, { likes: likes, likesCounter: likesQty });
    });
    countLikes.innerHTML = likesQty;
  }

  function firstLoad() {
    const colRef = collection(db, "comments");
    const q = query(colRef, orderBy("date", "desc"));
    let posts = [];
    //console.log(posts);
    getDocs(q).then((onSnapshot) => {
      onSnapshot.docs.forEach((document) => {
        const commentData = { id: document.id, ...document.data() };

        posts.push({
          name: commentData.name,
          post: commentData.comment,
          date: commentData.date.toDate(),
        });

        createDivs(commentData);
      });
    });
  }

  btnPostComment.addEventListener("click", () => {
    if (commentPost.value !== "") {
      const date = Timestamp.fromDate(new Date());
      const userId = auth.currentUser.uid;
      const likes = [];
      const likesCounter = 0;
      saveComment(
        commentPost.value,
        auth.currentUser.displayName,
        date,
        userId,
        likes,
        likesCounter
      ).then((result) => {
        const commentData = {
          id: result.id,
          name: auth.currentUser.displayName,
          comment: commentPost.value,
        };
        createDivs(commentData);
        commentPost.value = "";
        console.log(result.id);
      });
    }
  });

  btnSignOut.addEventListener("click", () => {
    exit()
      .then(() => {
        changeRoute("#/login");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return containerWall;
};
