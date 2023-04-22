import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
  }

  open(data) {
    this._image = this._popup.querySelector('.popup__photo-image');
    this._title = this._popup.querySelector('.popup__photo-title');
    this._image.src = data.link;
    this._title.textContent = data.title;
    super.open();
  }
}