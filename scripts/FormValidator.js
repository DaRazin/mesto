class FormValidator {
  constructor(settings, form){
    this._settings = settings;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners(){
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputState(inputElement, this._settings);
        this._toggleButtonPopup(this._inputs, this._buttonElement, this._settings);
      })
    })
  }

  _checkInputState = (inputElement) => {
    const parentInputElement = inputElement.closest(this._settings.formSelector);
    const errorMesssage = parentInputElement.querySelector(`.${inputElement.id}-error`);
    const isValid = inputElement.validity.valid;
    if (isValid) {
      this._hiddenError(errorMesssage);
      inputElement.classList.remove(this._settings.inputErrorClass);
    } else {
      this._showError(errorMesssage, inputElement.validationMessage);
      inputElement.classList.add(this._settings.inputErrorClass);
    }
  }

  _toggleButtonPopup = () => {
    if (this._hasInvalidInput()) {
      this._disabledButton();
    } else {
      this._enableButton();
    }
  }

  _showError = (errorElement, message) => {
    errorElement.textContent = message;
    errorElement.classList.add(this._settings.errorClass);
  } 
  
  _hiddenError = (errorElement) => {
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput = () => {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _disabledButton = () => {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
  
  _enableButton = () => {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
}
export default FormValidator;