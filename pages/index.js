import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";

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

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

console.log(initialCards);

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//const card = new Card(cardData, "#card-template");
//card.testMethod();

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

const cardSelector = "#card-template";

//const cardLikeButton = document.querySelector("#card-like-button");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  // remove Escape key event listener
  document.removeEventListener("keydown", handleEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  // add the  Escape key event listener
}
function handleEscape(event) {
  if (event.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closePopup(currentModal); // call the function to close the modal
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    // if evt.target's classList contains "modal"
    if (evt.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});
// select list of all modals
// iterate through it
// set event listener on each modal
// mousedown listener to close modal when it is clicked

//document.getElementById("overlay").addEventListener("click", closePopup);
//document.getElementById("openPopup").addEventListener("click", showPopup);

// Lookup adding and removing an event listener

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

function handleCardImageClick(name, link) {
  imagePreviewImgEl.src = link;
  imagePreviewImgEl.src = name;

  // put the caption under the image
  imagePreviewCaption.textContent = name;

  openPopup(imagePreviewModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  //renderCard();
  createCard({
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  });
  closePopup(addCardModal);
  e.target.reset();
}

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");

//   cardImageEl.addEventListener("click", () => {
//     // 1. set image src
//     // 2. set image alt text
//     // 3. set caption text
//     // open modal
//     imagePreviewCaption.textContent = data.name;
//     imagePreviewImgEl.src = data.link;
//     imagePreviewImgEl.alt = data.name;
//     // imagePreviewModal.classList.add("modal_opened");
//     openPopup(imagePreviewModal);
//   });

//   const likeButton = cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", () => {
//     //toggle a class on and off the like button
//     likeButton.classList.toggle("card__like-button_liked");
//   });
//   const cardDeleteButton = cardElement.querySelector(".card__delete-button");
//   cardDeleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.src = data.link;
//   cardImageEl.alt = data.name;
//   cardTitleEl.textContent = data.name;
//   return cardElement;
// }
// Handle key presses
//document.addEventListener(keydown, function (event) {
// if (event.key === "Escape")
//}

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

function renderCard(cardEl) {
  const cardElement = cardEl.getCardElement();
  cardsList.append(cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  renderCard(card);
}
// the old way
// initialCards.forEach((card) => {
//   // const newCard = getCardElement(card);
//   // cardsList.append(newCard);
//   renderCard(card, "append");
// });

//initialCards.forEach((cardData) => {
//  const card = new Card(cardData, "#card-template", handleCardImageClick);
//  renderCard(card);
//});

initialCards.forEach((cardData) => createCard(cardData));

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
