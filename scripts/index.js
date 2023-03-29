import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupPhotoImage = document.querySelector('.popup__photo-image');
const newPopupTitle = document.querySelector('.popup__photo-title');
const editButton = document.querySelector('.profile__btn_type_edit');
const closeButtons = document.querySelectorAll('.popup__btn_type_close');
const createButton = document.querySelector('.popup__btn_type_create');
const addButton =document.querySelector('.profile__btn_type_add');
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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const handleClickImage = (evt) => {
  const eventTarget = evt.target.closest('.photo__card');
  popupPhotoImage.src = eventTarget.querySelector('.photo__card-image').src;
  popupPhotoImage.alt = eventTarget.querySelector('.photo__card-text').textContent;
  newPopupTitle.textContent = eventTarget.querySelector('.photo__card-text').textContent;
  openPopup(popupPhoto);
}

const container = document.querySelector('.app');

const newCard = new Card(initialCards, container, handleClickImage);
newCard.render();

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
  const newObj = [
    {
      name: titleInput.value,
      link: linkInput.value
    }
  ]
  const newUserCard = new Card(newObj, container);
  newUserCard.render();
  closePopup(popupAdd);
  evt.target.reset();
  createButton.classList.add('popup__btn_type_disabled');
  createButton.setAttribute('disabled', true);
}

function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  const valueInputName = nameInput.value;
  const valueJobInput = jobInput.value;
  nameBox.textContent = valueInputName;
  jobBox.textContent = valueJobInput;
  closePopup(popupEdit);
}

editButton.addEventListener('click', handleEditButtonClick);
popupOverlay.forEach(overlay => overlay.addEventListener('click', handleOverlayClick));
closeButtons.forEach(function(btn){
  btn.addEventListener('click', handleCloseButtonClick);
})
addButton.addEventListener('click', handleAddButtonClick);
formEdit.addEventListener('submit', handleFormSubmitEdit);
formAdd.addEventListener('submit', handleFormSubmitAdd);

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
} 

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_disabled',
  errorClass: 'popup__error-message_active',
  inputErrorClass: 'popup__input_type_invalid'
};

const userEditForm = document.querySelector('#edit_user-form');
const addForm = document.querySelector('#add_form');

const formEditProfileValidation = new FormValidator(configValidation, userEditForm);
formEditProfileValidation.enableValidation();

const formAddValidation = new FormValidator(configValidation, addForm);
formAddValidation.enableValidation();