class Card {
  constructor(value, templateCard, handleCardClick, handleClickDelete, userId, handleAddLike, handleDeleteLike){
    this._templateCard = templateCard;
    this._name = value.name;
    this._link = value.link;
    this._handleCardClick = handleCardClick;
    this._handleClickDelete = handleClickDelete;
    this._userId = userId;
    this._ownerId = value.owner._id; 
    this._cardId = value._id;
    this._userLikeList = value.likes;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike =  handleDeleteLike;
  }

  createCard() {
    this._newPhotoCard =  this._templateCard.cloneNode(true).content.querySelector('.photo__card');
    this._newPhotoTitle = this._newPhotoCard.querySelector('.photo__card-text');
    this._newImageButton = this._newPhotoCard.querySelector('.photo__card-image');
    this._newPhotoLink = this._newPhotoCard.querySelector('.photo__card-image');
    this._newButtonLike = this._newPhotoCard.querySelector('.photo__btn-like');
    this._newButtonDelete = this._newPhotoCard.querySelector('.photo__btn-delete');
    this._counterLike = this._newPhotoCard.querySelector('.photo__counter-like');
    this._counterLike.textContent = this._userLikeList.length;
    this._newPhotoTitle.textContent = this._name;
    this._newPhotoLink.src = this._link;
    this._newImageButton.alt = this._name;
    if (this._checkUserLike()){
      this._newButtonLike.classList.add('photo__btn-like_active');
    }
    this._setEventListeners();
  return this._newPhotoCard
  }
  
  _checkUserLike(){
    return (this._userLikeList.find((item) => item._id === this._userId))
  }

  _handleClickLike = (evt) => {
    evt.target.classList.toggle('photo__btn-like_active');
    if (this._checkUserLike()){
      this._handleDeleteLike(this);
    } else {
      this._handleAddLike(this);
    }
  }
  
  renderLike(res){
    this._userLikeList = res.likes;
    this._counterLike.textContent = res.likes.length;
  }

  deleteCard = () => {
    this._newPhotoCard.remove();
  }
  
  _setEventListeners() {
    if (this._userId === this._ownerId){
      this._newButtonDelete.addEventListener('click', () => {
        this._handleClickDelete(this, this._cardId);
      });
    } else {
      this._newButtonDelete.remove();
    }
    this._newImageButton.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._newButtonLike.addEventListener('click', this._handleClickLike);
  }
}

export default Card;