import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, submitForm){
    super(selector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._dataInputList = {};
    this._inputList.forEach(input => {
      this._dataInputList[input.name] = input.value;
    })
    return this._dataInputList;
  }

  close(){
    super.close();
    this._form.reset();
  }

  setEventListenenrs(){
    super.setEventListenenrs();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}