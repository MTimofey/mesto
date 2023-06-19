// класс и конструктор новой карточки 
class Card {
  constructor({ cardData, userId, handleImageClick, handleDeleteCard, handleLikeCard }, templateSelector) {
    this._cardData = cardData;
    this._cardName = this._cardData.name;
    this._cardImageLink = this._cardData.link;
    this._cardLikes = this._cardData.likes;
    this._cardId = this._cardData._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  };

  // функция поиска темплейта 
  _createTemplate() {
    const cardTemp = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);
    
    return cardElement;
  };
  
  // функция удаления
  removeCard() {
    this._newCard.remove();
    this._newCard = null;
  };
  
  // функция создания карточки
  _renderCard() {
    this._newCard = this._createTemplate();

    this._titleCard = this._newCard.querySelector('.element__title');
    this._imageCard = this._newCard.querySelector('.element__image');
    this._buttonLikeCard = this._newCard.querySelector('.element__like-button');
    
    this._buttonDeleteCard = this._newCard.querySelector('.element__delete-button');
    if (this._userId !== this._cardData.owner._id) {
      this._buttonDeleteCard.style.display = 'none';
    }

    this._titleCard.textContent = this._cardName;
    this._imageCard.alt = this._cardName;
    this._imageCard.src = this._cardImageLink;

    this._numberLikes = this._newCard.querySelector('.element__like-number');
    this._numberLikes.textContent = this._cardLikes.length;
    
    this.showLike();
    this._setListeners();
  }
  
  getCard = () => {
    if (!this._newCard) {
      this._renderCard();
    }
    return this._newCard;
  };
  
  // функция показать лайк в карточке
  showLike() {
    this._cardLikes.forEach((element) => {
      if (element._id === this._userId) {
        this._buttonLikeCard.classList.add('element__like-button_active');
      }
    });
  }
  
  // функция показывающая что лайк нажат
  pressLikeCard() {
    return this._buttonLikeCard.classList.contains('element__like-button_active');
  }
  
  // функция подсчета лайков
  countLikeCard(count) {
    this._likes = this._cardData.likes;
    this._numberLikes.textContent = count;
    this._buttonLikeCard.classList.toggle('element__like-button_active');
  }

  // функция сбора функций и навешивание слушателя обработчика события
  _setListeners = () => {
    this._buttonLikeCard.addEventListener('click', () => this._handleLikeCard(this._cardId));
    this._imageCard.addEventListener('click', () => this._handleImageClick(this._cardName, this._cardImageLink));
    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleDeleteCard({cardObj: this._cardData, cardDom: this._newCard})
    })
  };
}

// экспорт
export { Card };
