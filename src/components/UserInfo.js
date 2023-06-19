// работа с полями инпута редактирования профиля
class UserInfo {
  constructor({ selectorUserName, selectorUserPosition, selectorAvatar }) {
    this._userName = document.querySelector(selectorUserName);
    this._userPosition = document.querySelector(selectorUserPosition);
    this._avatarLink = document.querySelector(selectorAvatar)
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userPosition: this._userPosition.textContent,
    };
  }
  
  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userPosition.textContent = userData.about;
  }

  setAvatar(avatarLink) {
    this._avatarLink.src = avatarLink;
  }
}

// экспорт
export { UserInfo };
