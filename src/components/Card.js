// класс и конструктор новой карточки 
class Card {
  constructor(cardData, templateSelector, handleImageClick) {
    this._handleImageClick = handleImageClick;
    this._cardData = cardData;
    this._cardName = this._cardData.name;
    this._cardImageLink = this._cardData.link;
    this._templateSelector = templateSelector;
  };

  // функция лайка
  _handleLikeCard = () => {
   this._buttonLikeCard.classList.toggle('element__like-button_active');
  };

  // функция удаления
  _handleDeleteCard = () => {
    this._newCard.remove();
    this._newCard = null;
  };


  // функция сбора функций и навешивание слушателя обработчика события
  _setListeners = () => {
    this._buttonLikeCard.addEventListener('click', () => this._handleLikeCard());
    this._buttonDeleteCard.addEventListener('click',() => this._handleDeleteCard());
    this._imageCard.addEventListener('click', () => this._handleImageClick(this._cardData));
  };

  // функция поиска темплейта 
  _createTemplate() {
    const cardTemp = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);
    
    return cardElement;
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
