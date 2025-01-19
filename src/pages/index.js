import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../utils/Api.js";
import { renderLoading } from "../utils/utils.js";
// import { set } from "core-js/core/dict";
import DeleteConfirmation from "../components/DeleteConfirmation.js";
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9be0dbf9-27c2-4836-ae55-e53d3f0122ee",
    "Content-Type": "application/json",
  },
});
// get the cards off the server, and set them on the dom
let cardSection;
api
  .getCardList()
  .then((result) => {
    console.log(result);
    cardSection = new Section(
      {
        items: result,
        renderer: renderCard,
      },
      ".cards__list"
    );

    cardSection.renderItems();
    // place the cards on the dom
    // set the 'items' in the section class to be the cards from the server
    // call renderItems method
  })
  .catch((err) => {
    console.error(err);
  });

// get the userinfo off the server, and set it on the dom
api
  .getUserInfo()
  .then((data) => {
    console.log(data);
    // set the name and description on the dom
    userInfo.setUserInfo(data.name, data.about);
    // set the avatar on the dom. ie: call the setAvatar method in the UserInfo class
    userInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err);
    alert("Could not get user info");
  });

console.log(initialCards);
const cardPreview = new PopupWithImage({
  popupSelector: "#image-preview-modal",
});
cardPreview.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileImageButton = document.querySelector(".profile__image-btn");
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
  avatarSelector: ".profile__image",
});

const profileImagePopup = new PopupWithForm({
  popupSelector: "#profile-image-modal",
  handleFormSubmit: handleProfileImageSubmit,
  formSelector: "#modal-image-form",
});

const deleteCardPopup = new DeleteConfirmation("#delete-conformation-modal");
deleteCardPopup.setEventListeners();

// Pass this to Card constructor
function handleDeleteClick(card) {
  deleteCardPopup.open();
  // Call the popup's open method
  // Call the setSubmitAction method and pass it an anonymous function
  deleteCardPopup.setSubmitAction(() => {
    console.log("card deletion handler called");
    // call the api function (delete handler)
    //    - pass it the id
    //    - after successful response delete the card
    const id = card.getId();
    api
      .deleteCard(id)
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
        console.log("It ran");
      })
      .catch((err) =>
        console.error(`An error has occured while deleting this card: ${err}`)
      );
  });
}

function handleLikeClick(card) {
  const id = card.getId();
  const likes = !card.isLiked();
  api
    .changeLikeCardStatus(id, likes)
    .then(() => {
      console.log(likes);
      card.updateLikesView();
    })
    .catch((err) =>
      console.error(`An error occurred when changing like status: ${err}`)
    );
}

//create a variable called deleteCardPopup
// pass your contructor properties to it
// create and pass handleDeleteCard function to your card class
// when that function fires it should fire your deleteCardPopup.open() and you must pass the card data to that .ope(CardData)
// const cardLikeButton = new Addlikes("#card-like-button");
// const isLiked = response.isLiked;

// if (isLiked) {
//   cardLikeButton.cardsList.add();
//   cardLikeButton.cardsList.remove();
// } else {
//   cardLikeButton.cardsList.remove();
//   cardLikeButton.cardsList.add();
// }
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(profileInfo, evt) {
  evt.submitter.textContent = "Saving...";
  api
    .setUserInfo({ name: profileInfo.title, about: profileInfo.description })
    .then(() => {
      userInfo.setUserInfo(profileInfo.title, profileInfo.description);
      editProfilePopup.close();
    })
    .catch((error) => {
      console.log("There was an error updating profile", error);
    })
    .finally(() => {
      evt.submitter.textContent = "Save";
    });
  // fetch to update the userinfo on the server

  // ... call setUserInfo method, passing it argument
  // arg:  { name: ..., job: ... }
}

function handleCardImageClick(name, link) {
  cardPreview.open(name, link);
}

function handleProfileImageSubmit(avatar, evt) {
  console.log("this is avatar", avatar);
  evt.submitter.textContent = "Saving...";
  api
    .updateProfilePic(avatar.link)
    .then(() => {
      console.log("This was successful");
      userInfo.setAvatar(avatar.link);
      profileImagePopup.close();
    })
    .catch((error) => {
      console.log("There was a error when submitting avatar", error);
    })
    .finally(() => {
      evt.submitter.textContent = "Save";
    });
  //Add error handling
  //Add pencil
  //add a finally block
}

function handleAddCardSubmit(inputValues, evt) {
  evt.submitter.textContent = "Saving...";

  // e.preventDefault();
  //renderCard();
  console.log("inputValues", inputValues);

  api
    .addNewCard({ name: inputValues.title, link: inputValues.description })
    .then((cardData) => {
      console.log("cardDATA", cardData);
      renderCard(cardData);
      addCardPopup.close(); // TODO use method
      addCardForm.reset();

      formValidators[addCardForm.getAttribute("id")].disableSubmitButton();
    })
    .catch((err) => {
      console.log("There was a error when adding card", err);
    })
    .finally(() => {
      evt.submitter.textContent = "Save";
    });

  // renderCard({
  //   name: inputValues.title,
  //   link: inputValues.description,
  // });

  // addCardFormValidator.disableSubmitButton();
  // formValidators[addCardForm.getAttribute("id")].resetValidation();
  // formValidators[addCardForm.getAttribute("id")].disableSubmitButton();
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

profileImageButton.addEventListener("click", () => {
  profileImagePopup.open();
});

//renderLoading(popupConfig.cardFormPopupSelector, true);
// TODO Remove all submit listeners (not the handlers)

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

function renderCard(cardData) {
  cardSection.addItem(createCard(cardData));
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardImageClick,
    handleDeleteClick,
    handleLikeClick
  );
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
    const formName = formElement.getAttribute("id");

    // Here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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
profileImagePopup.setEventListeners();

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
