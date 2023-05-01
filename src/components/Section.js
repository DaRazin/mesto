export default class Section {
  constructor({items, renderer}, selector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  rendererItems(objValues) {
    objValues.forEach(value => {
      this._renderer(value);
    });
  };


  addItem(element){
    this._container.prepend(element);
  }
}