import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupApproval from "../components/PopupApproval.js";
import {buttonEditProfile, buttonAddCard, nameInput, jobInput,
  userEditForm, formAddCard, templateCard, buttonEditAvatar, formEditAvatar, profileName, profileAboutUser, avatarUser, configValidation, apiConfig} from "../utils/constants.js";
import "./index.css";


let userId;

export const api = new Api (apiConfig);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([info, initialCards]) => {
  profileName.textContent = info.name;
  profileAboutUser.textContent = info.about;
  avatarUser.src = info.avatar;
  userId = info._id;
  initialCardList.rendererItems(initialCards);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
})

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
  aboutUserSelector: '.profile__about-yourself',
  avatarSelector: '.profile__avatar'
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

function handleFormSubmitAdd(newValues) {
  return api.sendNewCard(newValues)
  .then((result) => {
    initialCardList.addItem(createCard(result, templateCard, handleCardClick, handleDeleteCard, userId, handleAddLike, handleDeleteLike));
    popupAddCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

const popupAddCard = new PopupWithForm('.popup-add', handleFormSubmitAdd);
popupAddCard.setEventListenenrs();

const popupDeleteCard = new PopupApproval('.popup-delete', handleSubmitDelete)
popupDeleteCard.setEventListenenrs();

function handleSubmitDelete(card, cardId){
  return api.deleteCard(cardId)
  .then(() => {
    card.deleteCard();
    popupDeleteCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleFormSubmitEdit(newValues) {
  userData.setUserInfo({
    name: newValues.name,
    job: newValues.job
  })
  return api.sendUserInfo(newValues)
  .then(() => {
    popupEditProfile.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

const popupEditAvatar = new PopupWithForm('.popup-avatar', handleFormEditAvatar);
popupEditAvatar.setEventListenenrs();

function handleEditAvatarButtonClick() {
  formEditAvatarValidation.disabledButton();
  popupEditAvatar.open();
}


function handleFormEditAvatar(newValues) {
  return api.sendAvatarUser(newValues)
  .then((res) => {
    userData.setUserAvatar(res.avatar);
    popupEditAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })

}

const popupEditProfile = new PopupWithForm('.popup-edit', handleFormSubmitEdit);
popupEditProfile.setEventListenenrs();

buttonEditProfile.addEventListener('click', handleEditButtonClick);
buttonAddCard.addEventListener('click', handleAddButtonClick);
buttonEditAvatar.addEventListener('click', handleEditAvatarButtonClick);


function handleAddLike(card) {
  return api.sendCardLike(card._cardId)
  .then((res) => {
    card.renderLike(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleDeleteLike(card) {
  return api.deleteCardLike(card._cardId)
  .then((res) => {
    card.renderLike(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

