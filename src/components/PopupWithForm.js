import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupElement.querySelector;
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

const newCardPopup = new PopupWithForm("#profile-add-modal", () => {});
newCardPopup.open();

newCardPopup.close();

export default PopupWithForm;
