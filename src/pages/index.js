import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

console.log(initialCards);
const cardPreview = new PopupWithImage({
  popupSelector: "#image-preview-modal",
});
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
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// const imagePreviewModal = document.querySelector("#image-preview-modal");
// const imagePreviewImgEl = document.querySelector(".modal__image-preview");
// const imagePreviewCaption = document.querySelector(".modal__caption");
/*const imagePreviewCloseButton = document.querySelector(
  "#modal-image-preview-button"
);*/
const closeButtons = document.querySelectorAll(".modal__close");

// const cardSelector = "#card-template";

//const cardLikeButton = document.querySelector("#card-like-button");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(profileInfo) {
  // Instead of these two lines of code below
  // profileTitle.textContent = profileTitleInput.value;
  // profileDescription.textContent = profileDescriptionInput.value;
  // const userName = profileInfo.userName;
  // const job = profileInfo.job;

  userInfo.setUserInfo(profileInfo.title, profileInfo.description);
  // ... call setUserInfo method, passing it argument
  // arg:  { name: ..., job: ... }
  editProfilePopup.close();
}

function handleCardImageClick(name, link) {
  cardPreview.open(name, link);
}

function handleAddCardSubmit(inputValues) {
  // e.preventDefault();
  //renderCard();
  renderCard({
    name: inputValues.title,
    link: inputValues.description,
  });
  addCardPopup.close(); // TODO use method
  // e.target.reset();

  // addCardFormValidator.disableSubmitButton();
  // formValidators[addCardForm.getAttribute("name")].resetValidation();
  formValidators[addCardForm.getAttribute("name")].disableSubmitButton();
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
  editProfilePopup.open();
});

// add event listener for the add card modal close button
// TODO remove this loop

// Opening listeners stay
addNewCardButton.addEventListener("click", () => {
  //addCardModal.classList.add("modal_opened");
  // TODO use popup class's open method
  addCardPopup.open();
});

// TODO Remove all submit listeners (not the handlers)

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

function renderCard(cardData) {
  cardSection.addItem(createCard(cardData));
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

// initialCards.forEach((cardData) => renderCard(cardData));

// const editFormValidator = new FormValidator(config, profileEditForm);
// editFormValidator.enableValidation();

// const addCardFormValidator = new FormValidator(config, addCardForm);
// addCardFormValidator.enableValidation();

// define an object for storing validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // Here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
    const formName = formElement.getAttribute("name");

    // Here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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

const addCardPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardSubmit,
  formSelector: "#modal-add-form",
});
const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
  formSelector: "#profile-form",
});
// TODO call setEventListeners for each
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

// Do this for your editProfilePopup

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
