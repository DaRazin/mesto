const popupPhotoImage = document.querySelector('.popup__photo-image');
const newPopupTitle = document.querySelector('.popup__photo-title');
const editButton = document.querySelector('.profile__btn_type_edit');
const closeButtons = document.querySelectorAll('.popup__btn_type_close');
const saveButton = document.querySelector('.popup__btn_type_submit');
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
const templateCard = document.querySelector('.photo');

const handleClickDelete = (evt) => {
  evt.target.closest('.photo__card').remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

const handleClickImage = (evt) => {
  const eventTarget = evt.target.closest('.photo__card');
  popupPhotoImage.src = eventTarget.querySelector('.photo__card-image').src;
  popupPhotoImage.alt = eventTarget.querySelector('.photo__card-text').textContent;
  newPopupTitle.textContent = eventTarget.querySelector('.photo__card-text').textContent;
  openPopup(popupPhoto);
}

function createCard(item) {
  const newPhotoCard = templateCard.content.cloneNode(true);
  const newPhotoTitle = newPhotoCard.querySelector('.photo__card-text');
  const newImageButton = newPhotoCard.querySelector('.photo__card-image');
  const newPhotoLink = newPhotoCard.querySelector('.photo__card-image');
  const newButtonLike = newPhotoCard.querySelector('.photo__btn-like');
  const newButtonDelete = newPhotoCard.querySelector('.photo__btn-delete');
  newPhotoTitle.textContent = item.name;
  newPhotoLink.src = item.link;
  newImageButton.alt = item.name;
  newImageButton.addEventListener('click', handleClickImage);
  newButtonLike.addEventListener('click', function(event){
    event.target.classList.toggle('photo__btn-like_active');
  })
  newButtonDelete.addEventListener('click', handleClickDelete);
return newPhotoCard
}

initialCards.forEach(function (item){
  templateCard.append(createCard(item));
})

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

 function handleCloseButtonClick() {
   closePopup(popupEdit);
   closePopup(popupAdd);
  closePopup(popupPhoto);
}

const handleOverlayClick = (evt, popup) => {
  if (evt.target === evt.currentTarget){
    closePopup(evt.target);
  }
}

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const newObj = {
    name: titleInput.value,
    link: linkInput.value
  }
  templateCard.prepend(createCard(newObj));
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
