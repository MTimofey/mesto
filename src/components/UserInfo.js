// работа с полями инпута редактирования профиля
class UserInfo {
  constructor({ selectorUserName, selectorUserPosition }) {
    this._userName = document.querySelector(selectorUserName);
    this._userPosition = document.querySelector(selectorUserPosition);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userPosition: this._userPosition.textContent,
    };
  }
  
  setUserInfo({ userName, userPosition }) {
    this._userName.textContent = userName;
    this._userPosition.textContent = userPosition;
    }  
}

export { UserInfo };
