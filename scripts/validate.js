function enableValidation ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}){
  const forms = Array.from(document.querySelectorAll(formSelector));
  const settings = {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass};
  forms.forEach ((form) => {
    setEventListeners(form, settings);
  })
}

function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputState(inputElement, settings);
      toggleButtonPopup(inputs, buttonElement, settings);
    })
  })
}

const showError = (errorElement, message, settings) => {
  errorElement.textContent = message;
  errorElement.classList.add(settings.errorClass);
} 

const hiddenError = (errorElement, settings) => {
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

const checkInputState = (inputElement, settings) => {
  const parentInputElement = inputElement.closest(settings.formSelector);
  const errorMesssage = parentInputElement.querySelector(`.${inputElement.id}-error`);
  const isValid = inputElement.validity.valid;
  if (isValid) {
    hiddenError(errorMesssage, settings);
    inputElement.classList.remove(settings.inputErrorClass);
  } else {
    showError(errorMesssage, inputElement.validationMessage, settings);
    inputElement.classList.add(settings.inputErrorClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const enableButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const disabledButton = (buttonElement, settings) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonPopup = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    enableButton(buttonElement, settings);
  } else {
    disabledButton(buttonElement, settings);
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_disabled',
  errorClass: 'popup__error-message_active',
  inputErrorClass: 'popup__input_type_invalid'
});