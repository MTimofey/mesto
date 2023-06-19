// класс для открытия и закрытия попапов
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
    this._closePopupByOverlay = this._closePopupByOverlay.bind(this);
  }
  
  // функция открытия попапа
  openPopup() {
    this._popup.classList.add('popup__opened');
    document.addEventListener('keydown', this._closePopupByEsc);
  }
  
  // функция закрытия попапа
  closePopup() {
    this._popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this._closePopupByEsc);
  }
  
  // функция закрытия попапа по клику вне папапа (Overlay)
  _closePopupByOverlay(evt) {
    if (evt.currentTarget === evt.target) {
      this.closePopup(evt.currentTarget);
    }
  };

  // функция закрытия попапа через Esc
  _closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__opened')) {
        this.closePopup();
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.closePopup();
      }
    });
  }
}

// экспорт
export { Popup }
