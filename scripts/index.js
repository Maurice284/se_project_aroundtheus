const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

// const data = {
//   name: "Lake Louise",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
// };

// console.log(data.name);

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
/*const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-edit-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-edit-description-input"
);
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardUrlInput = document.querySelector("#add-card-url-input");
const addCardForm = document.forms["modal-add-form"];
/*const addCardModalCloseButton = document.querySelector(
  "#add-modal-close-button"
);*/
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#profile-add-modal");

const profileEditForm = document.forms["profile-form"];
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewImgEl = document.querySelector(".modal__image-preview");
const imagePreviewCaption = document.querySelector(".modal__caption");
/*const imagePreviewCloseButton = document.querySelector(
  "#modal-image-preview-button"
);*/
const closeButtons = document.querySelectorAll(".modal__close");

//const cardLikeButton = document.querySelector("#card-like-button");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}
//const CardTitleInput = addCardFormElement.querySelector(
//".profile-edit-name-input"
//);

//const cardTitleInput =
/* Events Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  renderCard({
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  });
  closePopup(addCardModal);
  e.target.reset();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.addEventListener("click", () => {
    // 1. set image src
    // 2. set image alt text
    // 3. set caption text
    // open modal
    imagePreviewCaption.textContent = data.name;
    imagePreviewImgEl.src = data.link;
    imagePreviewImgEl.alt = data.name;
    // imagePreviewModal.classList.add("modal_opened");
    openPopup(imagePreviewModal);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    //toggle a class on and off the like button
    likeButton.classList.toggle("card__like-button_liked");
  });
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

//function togglelike(button) {
//const heart = button.querySelector("#card-like-button");
//heart.classList.toggle("liked");
//}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  //profileEditModal.classList.add("modal_opened");
  openPopup(profileEditModal);
});

/*profileModalCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});*/
// add event listener for the add card modal close button
closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closePopup(popup));
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  //addCardModal.classList.add("modal_opened");
  openPopup(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

/*imagePreviewCloseButton.addEventListener("click", () => {
  closePopup(imagePreviewModal);
});*/
// define function called getCardElement

// for (let i = 0; i < initialCards.length; i++) {
//   cardsList.append(getCardElement(initialCards[i]));
// }

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

initialCards.forEach((card) => {
  // const newCard = getCardElement(card);
  // cardsList.append(newCard);
  renderCard(card, "append");
});
