import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupPhotoImage = document.querySelector('.popup__photo-image');
const newPopupTitle = document.querySelector('.popup__photo-title');
const buttonEditProfile = document.querySelector('.profile__btn_type_edit');
const buttonsClose = document.querySelectorAll('.popup__btn_type_close');
const buttonAddCard =document.querySelector('.profile__btn_type_add');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const formEdit = document.querySelector('.popup__container_edit');
const formAdd = document.querySelector('.popup__container_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameBox = document.querySelector('.profile__name');
const jobBox = document.querySelector('.profile__about-yourself');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupOverlay = document.querySelectorAll('.popup');
const userEditForm = document.querySelector('#edit_user-form');
const formAddCard = document.querySelector('#add_form');
const container = document.querySelector('.app');

const handleClickImage = (evt) => {
  const eventTarget = evt.target.closest('.photo__card');
  popupPhotoImage.src = eventTarget.querySelector('.photo__card-image').src;
  popupPhotoImage.alt = eventTarget.querySelector('.photo__card-text').textContent;
  newPopupTitle.textContent = eventTarget.querySelector('.photo__card-text').textContent;
  openPopup(popupPhoto);
}

function createCard(objValues){
  const newCard = new Card(objValues, container, handleClickImage).render();
  return newCard;
}

initialCards.forEach((value) => {
  createCard(value);
})

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_disabled',
  errorClass: 'popup__error-message_active',
  inputErrorClass: 'popup__input_type_invalid'
};

const formEditProfileValidation = new FormValidator(configValidation, userEditForm);
formEditProfileValidation.enableValidation();

const formAddValidation = new FormValidator(configValidation, formAddCard);
formAddValidation.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function handleEditButtonClick() {
  openPopup(popupEdit);
  nameInput.value = nameBox.textContent;
  jobInput.value = jobBox.textContent;
}

function handleAddButtonClick() {
  openPopup(popupAdd);
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

 function handleCloseButtonClick(evt) {
  closePopup(evt.target.closest('.popup'));
}

const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget){
    closePopup(evt.target);
  }
}

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const newValue = 
    {
      name: titleInput.value,
      link: linkInput.value
    }
  createCard(newValue);
  closePopup(popupAdd);
  evt.target.reset();
  formAddValidation._disabledButton();
}

function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  const valueInputName = nameInput.value;
  const valueJobInput = jobInput.value;
  nameBox.textContent = valueInputName;
  jobBox.textContent = valueJobInput;
  closePopup(popupEdit);
}

buttonEditProfile.addEventListener('click', handleEditButtonClick);
popupOverlay.forEach(overlay => overlay.addEventListener('click', handleOverlayClick));
buttonsClose.forEach(function(btn){
  btn.addEventListener('click', handleCloseButtonClick);
})
buttonAddCard.addEventListener('click', handleAddButtonClick);
formEdit.addEventListener('submit', handleFormSubmitEdit);
formAdd.addEventListener('submit', handleFormSubmitAdd);

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
} 
