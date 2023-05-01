export const buttonEditProfile = document.querySelector('.profile__btn_type_edit');
export const buttonAddCard =document.querySelector('.profile__btn_type_add');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const userEditForm = document.querySelector('#edit_user-form');
export const formAddCard = document.querySelector('#add_form');
export const templateCard = document.querySelector('.photo');
export const buttonEditAvatar = document.querySelector('.profile__avatar');
export const formEditAvatar = document.querySelector('#edit_avatar-form');
export const defaultBtnSaveText = document.querySelector('.popup__btn_type_submit').textContent;
export const defaultBtnCreateText = document.querySelector('.popup__btn_type_create').textContent;
export const defaultBtnApprovalText = document.querySelector('.popup__btn_type_approval').textContent;
export const profileName = document.querySelector('.profile__name');
export const profileAboutUser = document.querySelector('.profile__about-yourself');
export const avatarUser = document.querySelector('.profile__avatar');

export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_disabled',
  errorClass: 'popup__error-message_active',
  inputErrorClass: 'popup__input_type_invalid'
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: '40c22773-baf6-45d2-bff7-cd833066101d',
    'Content-Type': 'application/json'
  }
}