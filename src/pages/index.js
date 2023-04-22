import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {buttonEditProfile, buttonAddCard, nameInput, jobInput, titleInput, linkInput,
  userEditForm, formAddCard, initialCards} from "../utils/constants.js";
import "./index.css";

const handleCardClick = (evt) => {
  const eventTarget = evt.target.closest('.photo__card');
  const dataImage = {
    link: eventTarget.querySelector('.photo__card-image').src,
    title: eventTarget.querySelector('.photo__card-text').textContent
  }
  const newPopupImage = new PopupWithImage('.popup-photo');
  newPopupImage.open(dataImage);
  newPopupImage.setEventListenenrs();
}

const initialCardList = new Section({
  items: initialCards,
  renderer: (objValues) => {
    const newCard = new Card(objValues, handleCardClick).createCard();
    initialCardList.addItem(newCard);
  }
}, '.app');

initialCardList.rendererItems();

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

function handleEditButtonClick() {
  popupEditProfile.open();
  popupEditProfile.setEventListenenrs();
}
function handleAddButtonClick() {
  popupAddCard.open();
  popupAddCard.setEventListenenrs();
}

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const newValue =[
    {
      name: titleInput.value,
      link: linkInput.value
    }
  ]
  const newUserCard = new Section({
    items: newValue,
    renderer: (objValues) => {
      const newCard = new Card(objValues, handleCardClick).createCard();
      initialCardList.addItem(newCard);
    }
  }, '.app');
  newUserCard.rendererItems();
  popupAddCard.close();
  evt.target.reset();
  formAddValidation.disabledButton();
}
const popupAddCard = new PopupWithForm('.popup-add', handleFormSubmitAdd);

function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  const userData = new UserInfo({
    userNameSelector: '.profile__name',
    aboutUserSelector: '.profile__about-yourself'
  })
  const valueInputName = nameInput.value;
  const valueJobInput = jobInput.value;
  userData.setUserInfo({
    name: valueInputName,
    job: valueJobInput
  })
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm('.popup-edit', handleFormSubmitEdit);

buttonEditProfile.addEventListener('click', handleEditButtonClick);
buttonAddCard.addEventListener('click', handleAddButtonClick);