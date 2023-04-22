export default class Popup {
  constructor(selector){
    this._popup = document.querySelector(selector);
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget){
      this.close(evt.target);
    }
  }
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close(openedPopup); 
    }
  }

  setEventListenenrs(){
    this._buttonClose = this._popup.querySelector('.popup__btn_type_close');
    this._buttonClose.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClick);
  }
}