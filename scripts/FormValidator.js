class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    // this._inputList = [...formEl.querySelectorAll(settings.inputSelector)]
    this._form = formEl;
  }

  _ShowInputError(inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(options.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(options.errorClass);
  }

  _toggleButtonState() {
    // this has inputValues can use the this._inputEls list, you dont need to pass any arguments
    // and you should use this._hasInvalidInput
    if (this._hasInvalidInput()) {
      // use this.submitButton instead of subitButton
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;

      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity() {
    // you need to use the hasInvalidIput function to check each input to see if they are valid
    // if they are not valid then call the this._showInputError
    // if they are call the this._hideInputError method
  }

  _setEventListners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListners();
  }
}

export default FormValidator;
