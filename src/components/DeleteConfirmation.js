import Popup from "./Popup.js";

class DeleteConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    // select the form
    this._formEl = this._popupElement.querySelector(".modal__form");
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteSubmit(this._card);
    });
  }

  setSubmitAction(handleSubmit) {
    this._handleDeleteSubmit = handleSubmit;
  }
}

export default DeleteConfirmation;
