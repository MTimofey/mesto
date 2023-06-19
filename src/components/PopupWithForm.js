// импорт
import { Popup } from './Popup.js'

// работа с формами попапов
class PopupWithForm extends Popup {
  constructor( popupSelector, callbackSubmitForm ) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._formContent = this._popup.querySelector('.popup__content');
    this._inputFields = Array.from(this._formContent.querySelectorAll('.popup__text'));
    this._buttonForSaving = this._popup.querySelector('.popup__submit-button');
  }

  // собирает данные всех полей формы.
  _getInputValues() {
    const cardData = new Object();
    this._inputFields.forEach((input) => {
      cardData[input.name] = input.value;
    });
    return cardData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formContent.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._formContent.reset();
  }

  loadingConfirm(isLoading, content) {
    if (isLoading) {
      this._buttonForSaving.textContent = "Сохранение...";
    } else {
      this._buttonForSaving.textContent = content;
    }
  }
}

// экспорт 
export { PopupWithForm }
