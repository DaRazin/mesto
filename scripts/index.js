let editButton = document.querySelector('.profile__btn_type_edit');
let closeButton = document.querySelector('.popup__btn_type_close');
let saveBatton = document.querySelector('.popup__btn_type_submit');
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameBox = document.querySelector('.profile__name');
let jobBox = document.querySelector('.profile__about-yourself');

function handleEditButtonClick() {
  popup.classList.add('popup_opened');
  nameInput.value = nameBox.textContent;
  jobInput.value = jobBox.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleCloseButtonClick() {
  closePopup();
}


function handleFormSubmit (evt) {
  evt.preventDefault();
  let valueInputName = nameInput.value;
  let valueJobInput = jobInput.value;
  nameBox.textContent = valueInputName;
  jobBox.textContent = valueJobInput;
  closePopup();
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
form.addEventListener('submit', handleFormSubmit);