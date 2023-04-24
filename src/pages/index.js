import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {buttonEditProfile, buttonAddCard, nameInput, jobInput,
  userEditForm, formAddCard, templateCard, configValidation, initialCards} from "../utils/constants.js";
import "./index.css";

const newPopupImage = new PopupWithImage('.popup-photo');
newPopupImage.setEventListenenrs();
const handleCardClick = (title, link) => {
  newPopupImage.open(title, link);
}

const createCard = (objData, templateElem, funchandleCardClick) => {
  const newCard = new Card(objData, templateElem, funchandleCardClick).createCard();
  return newCard
}

const initialCardList = new Section({
  items: initialCards,
  renderer: (objValues) => {
    initialCardList.addItem(createCard(objValues, templateCard, handleCardClick));
  }
}, '.app');

initialCardList.rendererItems();

const formEditProfileValidation = new FormValidator(configValidation, userEditForm);
formEditProfileValidation.enableValidation();

const formAddValidation = new FormValidator(configValidation, formAddCard);
formAddValidation.enableValidation();

const userData = new UserInfo({
  userNameSelector: '.profile__name',
  aboutUserSelector: '.profile__about-yourself'
})

function handleEditButtonClick() {
  popupEditProfile.open();
  const infoObject = userData.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.job; 
}

function handleAddButtonClick() {
  popupAddCard.open();
}

const handleFormSubmitAdd = (newValues) => {
  initialCardList.addItem(createCard(newValues, templateCard, handleCardClick))
  popupAddCard.close();
  formAddValidation.disabledButton();
}
const popupAddCard = new PopupWithForm('.popup-add', handleFormSubmitAdd);
popupAddCard.setEventListenenrs();

function handleFormSubmitEdit (newValues) {
  userData.setUserInfo({
    name: newValues.name,
    job: newValues.job
  })
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm('.popup-edit', handleFormSubmitEdit);
popupEditProfile.setEventListenenrs();
buttonEditProfile.addEventListener('click', handleEditButtonClick);
buttonAddCard.addEventListener('click', handleAddButtonClick);