const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass, 
  errorClass
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  const settings = {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass};
  console.log(settings.errorClass);
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: '.popup__btn_type_disabled',
  inputErrorClass: '.popup__input_type_invalid',
  errorClass: '.popup__error-message_active'
});