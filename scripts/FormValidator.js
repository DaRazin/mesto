class FormValidator {
  constructor(settings, form){
    this._settings = settings;
    this._form = form; 
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners(){
    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputState(inputElement, this._settings);
        this._toggleButtonPopup(this._inputs, this._buttonElement, this._settings);
      })
    })
  }

  _checkInputState = (inputElement, settings) => {
    const parentInputElement = inputElement.closest(settings.formSelector);
    const errorMesssage = parentInputElement.querySelector(`.${inputElement.id}-error`);
    const isValid = inputElement.validity.valid;
    if (isValid) {
      this._hiddenError(errorMesssage, settings);
      inputElement.classList.remove(settings.inputErrorClass);
    } else {
      this._showError(errorMesssage, inputElement.validationMessage, settings);
      inputElement.classList.add(settings.inputErrorClass);
    }
  }

  _toggleButtonPopup = (inputList, buttonElement, settings) => {
    if (this._hasInvalidInput(inputList)) {
      this._enableButton(buttonElement, settings);
    } else {
      this._disabledButton(buttonElement, settings);
    }
  }

  _showError = (errorElement, message, settings) => {
    errorElement.textContent = message;
    errorElement.classList.add(settings.errorClass);
  } 
  
  _hiddenError = (errorElement, settings) => {
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _enableButton = (buttonElement, settings) => {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  
  _disabledButton = (buttonElement, settings) => {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
export default FormValidator;