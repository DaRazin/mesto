import Popup from "./Popup.js";
export default class PopupApproval extends Popup {
  constructor(selector, submitFormDelete){
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitFormDelete = submitFormDelete;
    this._btnDelete = this._popup.querySelector('.popup__btn_type_approval');
  }

  open(card, cardId){
    this._card = card;
    this._cardId = cardId;
    super.open();
  }

  setEventListenenrs(){
    super.setEventListenenrs();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const defaultTextBtn = this._btnDelete.textContent;
      this._btnDelete.textContent = 'Удаление...';
      this._submitFormDelete(this._card, this._cardId)
      .then(() => {
        this.close();
      })
      .finally(() => {
        this._btnDelete.textContent = defaultTextBtn;
      })
    });
  }
}