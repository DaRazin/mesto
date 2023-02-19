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

const templateCard = document.querySelector('.photo');
const popupTempalate = document.querySelector('.popup__template');
const handleClickDelete = (evt) => {
  evt.target.closest('.photo__card').remove();
}

const handleClickImage = (evt) => {
  const eventTarget = evt.target.closest('.photo__card');
  const popupPhotoImage = document.querySelector('.popups__photo-image');
  popupPhotoImage.src = eventTarget.querySelector('.photo__card-image').src;
  const newPopupTitle = document.querySelector('.popups__photo-title');
  newPopupTitle.textContent = eventTarget.querySelector('.photo__card-text').textContent;
  function openPopupPhoto() {
    popupPhoto.classList.add('popups_opened');
  }
  openPopupPhoto();
}

// const handleClickImage = (evt) => {
//   const eventTarget = evt.target.closest('.photo__card');
//   const newPopupPhoto = popupTempalate.content.cloneNode(true);
//   const newImageLink = newPopupPhoto.querySelector('.popups__photo-image');
//   const newPopupTitle = newPopupPhoto.querySelector('.popups__photo-title');
//   const newButtonDeletePopup = newPopupPhoto.querySelector('.popup__btn_type_delete');
//   newImageLink.src = eventTarget.querySelector('.photo__card-image').src;
//   newPopupTitle.textContent = eventTarget.querySelector('.photo__card-text').textContent;
//   popupTempalate.append(newPopupPhoto);
//   const test = document.querySelector('.popups__photo');
//   newButtonDeletePopup.addEventListener('click', function remove(evt){
//     evt.target.closest('.popups__photo').remove();
//   })
// }

initialCards.forEach(function (item){
  const newPhotoCard = templateCard.content.cloneNode(true);
  const newPhotoTitle = newPhotoCard.querySelector('.photo__card-text');
  const newImageBatton = newPhotoCard.querySelector('.photo__card-image');
  const newPhotoLink = newPhotoCard.querySelector('.photo__card-image');
  const newButtonLike = newPhotoCard.querySelector('.photo__btn-like');
  const newButtonDelete = newPhotoCard.querySelector('.photo__btn-delete');
  newPhotoTitle.textContent = item.name;
  newPhotoLink.src = item.link;
  newImageBatton.addEventListener('click', handleClickImage);
  newButtonLike.addEventListener('click', function(event){
    event.target.classList.toggle('photo__btn-like_active');
  })
  newButtonDelete.addEventListener('click', handleClickDelete);
  templateCard.append(newPhotoCard);
})


let editButton = document.querySelector('.profile__btn_type_edit');
let closeButtons = document.querySelectorAll('.popup__btn_type_close');
let saveBatton = document.querySelector('.popup__btn_type_submit');
let createBatton = document.querySelector('.popup__btn_type_create');
let addBatton =document.querySelector('.profile__btn_type_add');
let popupEdit = document.querySelector('.popup-edit');
let popupAdd = document.querySelector('.popup__add');
let popupPhoto = document.querySelector('.popups__photo');
let formEdit = document.querySelector('.popup__container_edit');
let formAdd = document.querySelector('.popup__container_add');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameBox = document.querySelector('.profile__name');
let jobBox = document.querySelector('.profile__about-yourself');

function handleEditButtonClick() {
  popupEdit.classList.add('popups_opened');
  nameInput.value = nameBox.textContent;
  jobInput.value = jobBox.textContent;
}

function handleAddButtonClick() {
  popupAdd.classList.add('popups_opened');
}

function closePopup() {
  popupEdit.classList.remove('popups_opened');
  popupAdd.classList.remove('popups_opened');
  popupPhoto.classList.remove('popups_opened');
}

function handleCloseButtonClick() {
  closePopup();
}

let titleInput = document.querySelector('.popup__input_type_type');
let linkInput = document.querySelector('.popup__input_type_link');

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const newPhotoCard = templateCard.content.cloneNode(true);
  const newPhotoTitle = newPhotoCard.querySelector('.photo__card-text');
  const newPhotoLink = newPhotoCard.querySelector('.photo__card-image');
  const newImageBatton = newPhotoCard.querySelector('.photo__card-image');
  
  newPhotoTitle.textContent = titleInput.value;
  newPhotoLink.src = linkInput.value;
  const newButtonLike = newPhotoCard.querySelector('.photo__btn-like');
  const newButtonDelete = newPhotoCard.querySelector('.photo__btn-delete');
  newImageBatton.addEventListener('click', handleClickImage);
  newButtonLike.addEventListener('click', function(event){
    event.target.classList.toggle('photo__btn-like_active');
  })
  newButtonDelete.addEventListener('click', handleClickDelete);
  templateCard.prepend(newPhotoCard);
  closePopup();
  titleInput.value = '';
  linkInput.value = '';
}

function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  let valueInputName = nameInput.value;
  let valueJobInput = jobInput.value;
  nameBox.textContent = valueInputName;
  jobBox.textContent = valueJobInput;
  closePopup();
}

editButton.addEventListener('click', handleEditButtonClick);
closeButtons.forEach(function(btn){
btn.addEventListener('click', handleCloseButtonClick);
})
addBatton.addEventListener('click', handleAddButtonClick);
formEdit.addEventListener('submit', handleFormSubmitEdit);
formAdd.addEventListener('submit', handleFormSubmitAdd);
