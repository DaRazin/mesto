class Card {
  static _templateCard = document.querySelector('.photo').content;

  constructor(value, handleClickImage){
    this._name = value.name;
    this._link = value.link;
    this._handleClickImage = handleClickImage;
  }

  createCard() {
    this._newPhotoCard =  Card._templateCard.cloneNode(true).children[0];
    this._newPhotoTitle = this._newPhotoCard.querySelector('.photo__card-text');
    this._newImageButton = this._newPhotoCard.querySelector('.photo__card-image');
    this._newPhotoLink = this._newPhotoCard.querySelector('.photo__card-image');
    this._newButtonLike = this._newPhotoCard.querySelector('.photo__btn-like');
    this._newButtonDelete = this._newPhotoCard.querySelector('.photo__btn-delete');
    this._newPhotoTitle.textContent = this._name;
    this._newPhotoLink.src = this._link;
    this._newImageButton.alt = this._name;
    this._setEventListeners();
  return this._newPhotoCard
  }
  
  _handleClickLike = (evt) => {
    evt.target.classList.toggle('photo__btn-like_active');
  }

  _handleClickDelete = () => {
      this._newPhotoCard.remove();
    }
  
  _setEventListeners() {
    this._newImageButton.addEventListener('click', this._handleClickImage);
    this._newButtonLike.addEventListener('click', this._handleClickLike);
    this._newButtonDelete.addEventListener('click', this._handleClickDelete);
  }
}

export default Card;