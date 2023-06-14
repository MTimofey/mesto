// импорты
import { Popup } from './Popup.js';

// работа с данными картинки
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCurrentImage = this._popup.querySelector('.popup__img');
    this._popupPhotoDescription = this._popup.querySelector('.popup__description');
  }

  openPopup({ name, link }) {
    this._popupCurrentImage.src = link;
    this._popupCurrentImage.alt = name;
    this._popupPhotoDescription.textContent = name;

    super.openPopup();
  };
}

export { PopupWithImage };
