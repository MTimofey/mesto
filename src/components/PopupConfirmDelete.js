import { Popup } from "./Popup.js";

class PopupConfirmDelete extends Popup  {
  constructor(popupSelector, apiCallBacks) {
    super(popupSelector);
    this._apiCallBacks = apiCallBacks;
    this._buttonConfirmSaving = this._popup.querySelector('.popup__submit-button')
  }
  
  openPopup(cardId) {
    super.openPopup();
    this._cardId = cardId
  }

  closePopup() {
    super.closePopup()
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirmSaving.addEventListener('click', (evt) => { evt.preventDefault(); this._apiCallBacks(this._cardId)})
  }

  loadingConfirm(isLoading, content) {
    if (isLoading) {
      this._buttonConfirmSaving.textContent = 'Сохранение...';
    } else {
      this._buttonConfirmSaving.textContent = content;
    }
  }
}

export { PopupConfirmDelete };