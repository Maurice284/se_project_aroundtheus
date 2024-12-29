export default class Popup {
  constructor(PopupSelector) {
    this._popupElement = document.querySelector(PopupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    // listens for esc button
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listners
    this._popupElement.addEventListener("mousedown", (evt) => {
      // if statemet, specify  for modal overlay and close button
      console.log(evt.target);
      // if the element clicked on is the overlay (the modal itself) or the close button, then we close the modal
      if (
        evt.target === this._popupElement ||
        evt.target === this._closeButton
      ) {
        this.close();
      }

      //
    }); //this.close();
  }
}
