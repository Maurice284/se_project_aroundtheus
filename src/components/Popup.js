export default class Popup {
  constructor({ PopupSelector }) {
    this._popupElement = document.querySelector(PopupSelector);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    // closes popup
  }

  _handleEscClose() {
    // listens for esc button
  }

  setEventListeners() {
    // sets event listners
  }
}
