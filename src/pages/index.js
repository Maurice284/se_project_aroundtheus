import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";

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
const cardPreview = new PopupWithImage("#image-preview-modal");
cardPreview.setEventListeners();

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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

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
    console.log(evt.target);
    // if evt.target's classList contains "modal"
    if (evt.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  // Instead of these two lines of code below
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  const userName = profileTitleInput.value;
  const job = profileDescriptionInput.value;

  userInfo.setUserInfo(userName, job);
  // ... call setUserInfo method, passing it argument
  // arg:  { name: ..., job: ... }
  closePopup(profileEditModal);
}

function handleCardImageClick(name, link) {
  cardPreview.open(name, link);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  //renderCard();
  renderCard({
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  });
  closePopup(addCardModal);
  e.target.reset();

  addCardFormValidator.disableSubmitButton();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  // Call userInfo.getUserInfo, assign return value to a variable
  const profileInfo = userInfo.getUserInfo(); // profileInfo.name = "Jacques Cousteau"
  profileTitleInput.value = profileInfo.userName; // use the object's properties instead of getting text content directly
  profileDescriptionInput.value = profileInfo.job;
  //profileEditModal.classList.add("modal_opened");
  openPopup(profileEditModal);
});

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

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

function renderCard(cardData) {
  const cardElement = createCard(cardData); // create
  cardsList.prepend(cardElement); // add
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

// initialCards.forEach((cardData) => renderCard(cardData));

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItem(createCard(data));
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// const chatSection = new Section(
//   {
//     items: [{ message: "hello" }, { message: "how are you" }],
//     renderer: (data) => {
//       // create html element based on message
//       // place that element on the page
//     },
//   },
//   ".chat-section"
// );
