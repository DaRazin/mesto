class Api {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  getInitialCards(){
    return fetch (`${this._url}cards`, {
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  getUserInfo() {
    return fetch (`${this._url}users/me`, {
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
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
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
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
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE', 
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
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
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  sendCardLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  deleteCardLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }
}
export default Api;
