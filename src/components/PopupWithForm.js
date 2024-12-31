import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, formSelector }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formEl = this._popupElement.querySelector(formSelector);
  }

  close() {
    this._formEl.reset();
    super.close();
  }

  getInputValues(formSelector) {
    // create an empty object, named "inputValues" or something
    // loop through every input with forEach
    const inputs = document.querySelectorAll(`${formSelector} input`);
    const inputValues = {};

    // in the loop:
    //   get the input's .name and .value
    //   set inputValues[name] = value

    inputs.forEach((input) => {
      const name = input.name;
      const value = input.value;

      if (name) {
        inputValues[name] = value;
      }
    });

    return inputValues;
    // after the loop:
    // return inputValues
    // this returns something like:
  }
  // getInputValues() {
  // collect data from all the input fields and returns it as an object.
  // This data should then be passed to the submission handler as an argument.

  // review Objects in JS (accessing object properties)
  // review querySelectorAll and Node Lists
  // review array methods (forEach)
  //}

  setEventListeners() {
    console.log("form:", this._popupElement);
    super.setEventListeners();
    this._formEl.addEventListener("submit", () => {
      this._handleFormSubmit();
      // this._getInputValues();
    });
  }
}

export default PopupWithForm;
