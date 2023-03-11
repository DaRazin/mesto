const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_disabled',
  inputErrorClass: 'popup__input_type_invalid',
  errorClass: 'popup__error-message_active'
}

const enableValidation = (settingsObj) => {
  const forms = Array.from(document.querySelectorAll(settingsObj.formSelector));
  forms.forEach ((form) => {
    setEventListeners(form);
  })
};

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputState(inputElement);
      toggleButtonPopup(inputs, buttonElement);
    })
  })
}

const showError = (errorElement, message) => {
  errorElement.textContent = message;
  errorElement.classList.add(settings.errorClass);
} 

const hiddenError = (errorElement) => {
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

const checkInputState = (inputElement) => {
  const parentInputElement = inputElement.closest(settings.formSelector);
  const errorMesssage = parentInputElement.querySelector(`.${inputElement.id}-error`);
  const isValid = inputElement.validity.valid;
  if (isValid) {
    hiddenError(errorMesssage);
    inputElement.classList.remove(settings.inputErrorClass);
  } else {
    showError(errorMesssage, inputElement.validationMessage);
    inputElement.classList.add(settings.inputErrorClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const enableButton = (buttonElement) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const disabledButton = (buttonElement) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonPopup = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    enableButton(buttonElement);
  } else {
    disabledButton(buttonElement);
  }
}

enableValidation(settings);