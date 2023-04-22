export default class UserInfo {
  constructor({userNameSelector, aboutUserSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      job: this._aboutUser.textContent
    };
    return userData
  }

  setUserInfo({name, job}) {
    this._userName.textContent = name;
    this._aboutUser.textContent = job;
  }
}