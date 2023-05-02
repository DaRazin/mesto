export default class UserInfo {
  constructor({userNameSelector, aboutUserSelector, avatarSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(avatarSelector);
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

  setUserAvatar(userAvatarLink) {
    this._avatar.src = userAvatarLink;
  }
}