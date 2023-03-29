class Card {
  static _templateCard = document.querySelector('.photo').content;

  constructor(initialCards, container, handleClickImage){
    this._initialCards = initialCards;
    this._container = container;
    this._handleClickImage = handleClickImage;
  }

  _createCard(item) {
    this._newPhotoCard =  Card._templateCard.cloneNode(true).children[0];
    this._newPhotoTitle = this._newPhotoCard.querySelector('.photo__card-text');
    this._newImageButton = this._newPhotoCard.querySelector('.photo__card-image');
    this._newPhotoLink = this._newPhotoCard.querySelector('.photo__card-image');
    this._newButtonLike = this._newPhotoCard.querySelector('.photo__btn-like');
    this._newButtonDelete = this._newPhotoCard.querySelector('.photo__btn-delete');
    this._newPhotoTitle.textContent = item.name;
    this._newPhotoLink.src = item.link;
    this._newImageButton.alt = item.name;
    this._newImageButton.addEventListener('click', this._handleClickImage);
    this._newButtonLike.addEventListener('click', this._handleClickLike);
    this._newButtonDelete.addEventListener('click', this._handleClickDelete);
  return this._newPhotoCard
  }
  
  _handleClickLike = (evt) => {
    evt.target.classList.toggle('photo__btn-like_active');
  }

  _handleClickDelete = (evt) => {
      evt.target.closest('.photo__card').remove();
    }

  render() {
    this._initialCards.forEach((item) => {
      this._container.prepend(this._createCard(item));
    })
  }
}

export default Card;