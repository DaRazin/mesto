class Api {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

  getInitialCards(){
    return fetch (`${this._url}cards`, {
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  getUserInfo() {
    return fetch (`${this._url}users/me`, {
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  sendAvatarUser(newValues){
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newValues.link
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  sendUserInfo(newValues) {
    return fetch (`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newValues.name,
        about: newValues.job
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE', 
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  sendNewCard(newValues) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newValues.name,
        link: newValues.link
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  sendCardLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  deleteCardLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      })
    .then((res) => {
      return this._getResponseData(res);
    })
  }
}
export default Api;
