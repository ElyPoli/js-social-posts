"use strict";

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const postsList = document.querySelector(".posts-list");
let postContainer;
const arrayIdLike = [];

createPost(); // creo i post

console.log(arrayIdLike);

//Modifico la data trasformandola in formato IT
function dateItalian(i) {
    const dateSplit = posts[i].created.split("-");

    dateSplit.splice(0, 0, `${dateSplit[2]}`);
    dateSplit.splice(1, 0, `${dateSplit[2]}`);
    dateSplit.pop();
    dateSplit.pop();

    const newDate = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`;

    return newDate;
}

// Immagine di default per gli utenti senza immagine
function defaultImageUser(i) {
    const profilePic = document.querySelectorAll(".profile-pic");
    const postMetaIcon = document.querySelectorAll(".post-meta__icon");

    profilePic.forEach((element, z) => {
        if (posts[z].author.image === null) {
            // Modifico l'immagine
            profilePic[z].remove("img");
            const defaultImage = document.createElement("div");
            defaultImage.classList.add("profile-pic-default");
            postMetaIcon[z].append(defaultImage);

            // Aggiungo le iniziali del nome utente
            const defaultWord = document.createElement("span");
            const initialLetters = posts[i].author.name.slice(0, 2); // ottengo le prime due lettere del nome
            defaultWord.textContent = initialLetters;
            defaultImage.append(defaultWord);
        }
    })
}

// Creo i post
function createPost() {

    posts.forEach((singlePostElement, i) => {
        postContainer = document.createElement("div");
        postContainer.classList.add("post");

        postsList.append(postContainer);

        const newDateCreate = dateItalian(i);// Modifico la data trasformandola in formato IT

        postContainer.innerHTML +=
            `
                <div class="post__header">
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            <img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">                    
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${posts[i].author.name}</div>
                            <div class="post-meta__time">${newDateCreate}</div>
                        </div>                    
                    </div>
                </div>
                <div class="post__text">${posts[i].content}</div>
                <div class="post__image">
                    <img src="${posts[i].media}" alt="">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button  js-like-button" href="#" data-postid="${posts[i].id}">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="${posts[i].id}" class="js-likes-counter">${posts[i].likes}</b> persone
                        </div>
                    </div> 
                </div>            
            `;

        // Aggiungo un elemento dataset ad ogni pulsante
        const addDatasetLike = document.querySelectorAll(".js-like-button")
        addDatasetLike.forEach((element, i) => {
            element.dataset.like = " ";
        })

        // Immagine di default per gli utenti senza immagine
        if (posts[i].author.image === null) {
            defaultImageUser(i);
        }

        postContainer.querySelector(".js-likes").addEventListener("click", btnLike); // aggiungo al pulsante like un event listener
    })
}

// Click sul pulsante like
function btnLike() {
    const counterLikes = parseInt(this.querySelector(".js-likes-counter").textContent);
    const idLike = this.querySelector(".js-likes-counter").id;

    if (this.querySelector(".js-like-button").dataset.like === "Like") {
        this.querySelector(".js-like-button").dataset.like = " ";
        this.querySelector(".js-like-button").classList.remove("like-button--liked");
        this.querySelector(".js-likes-counter").textContent = counterLikes - 1;
        removeArrayIdLike(idLike); // Rimuovo l'id dell'elemento dall'array
    } else {
        this.querySelector(".js-like-button").dataset.like = "Like";
        this.querySelector(".js-like-button").classList.add("like-button--liked");
        this.querySelector(".js-likes-counter").textContent = counterLikes + 1;
        addArrayIdLike(idLike); // Aggiungo l'id dell'elemento con like all'array
    }

    console.log(arrayIdLike);
}

// Aggiungo l'id dell'elemento con like all'array
function addArrayIdLike(idLike) {
    arrayIdLike.push(idLike);
}

// Rimuovo l'id dell'elemento dall'array
function removeArrayIdLike(idLike) {
    let findLike = arrayIdLike.indexOf(idLike);
    if (findLike > -1) {
        arrayIdLike.splice(findLike, 1);
    }
}