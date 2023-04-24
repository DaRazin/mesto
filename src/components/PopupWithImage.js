import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
    this._image = this._popup.querySelector('.popup__photo-image');
    this._title = this._popup.querySelector('.popup__photo-title');
  }

  open(title, link) {
    this._image.src = link;
    this._title.textContent = title;
    this._image.alt = title;
    super.open();
  }
}