import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, submitForm){
    super(selector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._dataInputList = {};
    this._inputList.forEach(input => {
      this._dataInputList[input.name] = input.value;
    })
    return this._dataInputList;
  }

  close(){
    super.close();
  }

  setEventListenenrs(){
    super.setEventListenenrs();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', this._submitForm);
  }
}