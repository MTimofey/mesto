// импорт
import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupSelector,{ callbackSubmitForm } ) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._formContent = this._popup.querySelector('.popup__content');
    this._inputFields = Array.from(this._formContent.querySelectorAll('.popup__text'));
    this._handleSubmit = this._handleSubmit.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  // собирает данные всех полей формы.
  _getInputValues() {
    const cardData = new Object();
    this._inputFields.forEach((input) => {
      cardData[input.name] = input.value;
    });
    return cardData;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._callbackSubmitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formContent.addEventListener('submit', this._handleSubmit);
  }

  closePopup() {
    super.closePopup();
    this._formContent.reset();
  }
}

// экспорт 
export { PopupWithForm }
