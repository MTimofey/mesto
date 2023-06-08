// импорты
import { popupImageFullPicture, popupCurrentImage, popupPhotoDescription } from './constant.js';
import { openPopup } from './functions.js';

// класс и конструктор новой карточки 
class Card {
  constructor(cardAdd, templateSelector) {
    this._cardAdd = cardAdd;
    this._cardName = this._cardAdd.name;
    this._cardImageLink = this._cardAdd.link;
    this._templateSelector = templateSelector;
  };
  
  // функция открытия карточки 
  _handleOpenCard = (name, link) => {
    popupCurrentImage.src = link;
    popupCurrentImage.alt = name;
    popupPhotoDescription.textContent = name;

    openPopup(popupImageFullPicture);
  };

  // функция лайка
  _handleLikeCard = (buttonLikeCard) => {
    buttonLikeCard.classList.toggle('element__like-button_active');
  };

  // функция удаления
  _handleDeleteCard = (newCard) => {
    newCard.remove()
  };


  // функция сбора функций и навешивание слушателя обработчика события
  _setListeners = () => {
    this._imageCard.addEventListener('click', () => this._handleOpenCard(this._cardName, this._cardImageLink));
    this._buttonLikeCard.addEventListener('click', () => this._handleLikeCard(this._buttonLikeCard));
    this._buttonDeleteCard.addEventListener('click',() => this._handleDeleteCard(this._newCard));
  };

  // функция поиска темплейта 
  _createTemplate() {
    this._cardTemp = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemp.querySelector('.element').cloneNode(true);
    return this._cardElement;
  };

  // функция создания карточки
  _createCard() {
    this._newCard = this._createTemplate();
    this._titleCard = this._newCard.querySelector('.element__title');
    this._imageCard = this._newCard.querySelector('.element__image');
    this._buttonDeleteCard = this._newCard.querySelector('.element__delete-button');
    this._buttonLikeCard = this._newCard.querySelector('.element__like-button');
    this._titleCard.textContent = this._cardName;
    this._imageCard.alt = this._cardName;
    this._imageCard.src = this._cardImageLink;
    
    this._setListeners();
  }
  getCard = () => {
    if (!this._newCard) {
      this._createCard();
    }
    return this._newCard;
  };
}

// экспорты
export { Card };