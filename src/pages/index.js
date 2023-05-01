import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupApproval from "../components/PopupApproval.js";
import {buttonEditProfile, buttonAddCard, nameInput, jobInput,
  userEditForm, formAddCard, templateCard, buttonEditAvatar, formEditAvatar, defaultBtnSaveText,
  defaultBtnCreateText, defaultBtnApprovalText, profileName, profileAboutUser, avatarUser, configValidation, apiConfig} from "../utils/constants.js";
import "./index.css";


let userId;

export const api = new Api (apiConfig);

(function renderCrads() {
  api.getInitialCards()
  .then((res) => {
    initialCardList.rendererItems(res);
  })
  .catch((err) => {
    console.log(err);
  })
}());

(function setUserInfo() {
  api.getUserInfo()
  .then ((res) => {
    profileName.textContent = res.name;
    profileAboutUser.textContent = res.about;
    avatarUser.src = res.avatar;
    userId = res._id;
  })
  .catch((err) => {
    console.log(err);
  })
}());


const newPopupImage = new PopupWithImage('.popup-photo');
newPopupImage.setEventListenenrs();

const handleDeleteCard = (card, cardId) => {
  popupDeleteCard.open(card, cardId);
}

const handleCardClick = (title, link) => {
  newPopupImage.open(title, link);
}

const createCard = (objData, templateElem, funchandleCardClick, handleDeleteCard, userId, handleAddLike, handleDeleteLike) => {
  const newCard = new Card(objData, templateElem, funchandleCardClick, handleDeleteCard, userId, handleAddLike, handleDeleteLike).createCard();
  return newCard
}

const initialCardList = new Section({
  items: [],
  renderer: (objValues) => {
    initialCardList.addItem(createCard(objValues, templateCard, handleCardClick, handleDeleteCard, userId, handleAddLike, handleDeleteLike));
  }
}, '.app');


const formEditProfileValidation = new FormValidator(configValidation, userEditForm);
formEditProfileValidation.enableValidation();

const formAddValidation = new FormValidator(configValidation, formAddCard);
formAddValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(configValidation, formEditAvatar);
formEditAvatarValidation.enableValidation();

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

function handleFormSubmitAdd(newValues, buttonSubmit) {
  renderLoading(true, buttonSubmit);
  api.sendNewCard(newValues)
  .then((result) => {
    initialCardList.rendererItems([result]);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, buttonSubmit);
    popupAddCard.close();
    buttonSubmit.textContent = defaultBtnCreateText;
  })
}

const popupAddCard = new PopupWithForm('.popup-add', handleFormSubmitAdd);
popupAddCard.setEventListenenrs();

const popupDeleteCard = new PopupApproval('.popup-delete', handleSubmitDelete)
popupDeleteCard.setEventListenenrs();

function handleSubmitDelete(card, cardId, buttonSubmit){
  renderLoading(true, buttonSubmit);
  api.deleteCard(cardId)
  .then(() => {
    card.deleteCard();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, buttonSubmit);
    popupDeleteCard.close();
    buttonSubmit.textContent = defaultBtnApprovalText;
  })
}

function handleFormSubmitEdit(newValues, buttonSubmit) {
  renderLoading(true, buttonSubmit);
  userData.setUserInfo({
    name: newValues.name,
    job: newValues.job
  })
  api.sendUserInfo(newValues)
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, buttonSubmit);
    popupEditProfile.close();
    buttonSubmit.textContent = defaultBtnSaveText;
  })
}

const popupEditAvatar = new PopupWithForm('.popup-avatar', handleFormEditAvatar);
popupEditAvatar.setEventListenenrs();

function handleEditAvatarButtonClick() {
  popupEditAvatar.open();
}


function handleFormEditAvatar(newValues, buttonSubmit) {
  renderLoading(true, buttonSubmit);
  api.sendAvatarUser(newValues)
  .then((res) => {
    avatarUser.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, buttonSubmit);
    popupEditAvatar.close();
    formEditAvatarValidation.disabledButton();
    buttonSubmit.textContent = defaultBtnSaveText;
  })
}

const popupEditProfile = new PopupWithForm('.popup-edit', handleFormSubmitEdit);
popupEditProfile.setEventListenenrs();

buttonEditProfile.addEventListener('click', handleEditButtonClick);
buttonAddCard.addEventListener('click', handleAddButtonClick);
buttonEditAvatar.addEventListener('click', handleEditAvatarButtonClick);


function handleAddLike(card) {
  api.sendCardLike(card._cardId)
  .then((res) => {
    card.renderLike(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleDeleteLike(card) {
  api.deleteCardLike(card._cardId)
  .then((res) => {
    card.renderLike(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

function renderLoading (isLoading, buttonSubmit){
  if (isLoading){
    buttonSubmit.textContent = 'Сохранение...';
  }
}

