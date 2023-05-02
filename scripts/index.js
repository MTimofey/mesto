// константы
const popups = document.querySelectorAll('.popup');

const popupUsernameEdit = document.querySelector('.popup_username-edit');
const popupCardAdd = document.querySelector('.popup_card-add');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#template-elements').content.querySelector('.element');

const userName = document.querySelector('.profile__title');
const userPosition = document.querySelector('.profile__position');
const inputUserName = document.querySelector('.popup__text_username');
const inputUserPosition = document.querySelector('.popup__text_user-position');
const inputPhotoName = document.querySelector('.popup__text_photo-name');
const inputPhotoLink = document.querySelector('.popup__text_photo-link');

const popupImageFullPicture = document.querySelector('.popup_full-img');
const popupCurrentImage = popupImageFullPicture.querySelector('.popup__img');
const popupPhotoDescription = popupImageFullPicture.querySelector('.popup__description');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCardAdd = document.querySelector('.profile__add-button');
const buttonClosePopupEditProfile = popupUsernameEdit.querySelector('.popup__close-button');
const buttonClosePopupCardAdd = popupCardAdd.querySelector('.popup__close-button');
const buttonClosePopupImageFull = popupImageFullPicture.querySelector('.popup__close-button');

const bottonSubmitEditProfile = popupUsernameEdit.querySelector('.popup__submit-button')
const buttonSubmitAddCard  = popupCardAdd.querySelector('.popup__submit-button');



// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup__opened'); 
  document.addEventListener('keydown', closePopupByEsc);
  closePopupByOverlay(popup);
};

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup__opened');
};

// функция закрытия попапа через Esc 
function closePopupByEsc(evt) {
  const popupVisible = document.querySelector('.popup__opened');

  if (evt.key === 'Escape' && popupVisible) {
    closePopup(popupVisible);
  }
};

// функция закрытия попапа по клику вне папапа (Overlay)
function closePopupByOverlay(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  });
};

// функция открытия карточки
const handleOpenCard = (name, link) => {
	popupPhotoDescription.textContent = name;
  popupCurrentImage.src = link;

  openPopup(popupImageFullPicture);
}

// функция удаления карточки
const handleDeleteCard = (newCard) => {
  newCard.remove();
};

// функция лайка 
const handleLikeCard = (buttonLikeCard) => {
	buttonLikeCard.classList.toggle('element__like-button_active');
};

// функция создания карточки
function createNewCard (data) {
  const newCard = elementsTemplate.cloneNode(true);
  const titleCard = newCard.querySelector('.element__title');
  const imageCard = newCard.querySelector('.element__image');
  const buttonDeleteCard = newCard.querySelector('.element__delete-button');
  const buttonLikeCard = newCard.querySelector('.element__like-button');
  titleCard.textContent = data.name;
  imageCard.alt = data.name;
  imageCard.src = data.link;
  imageCard.addEventListener('click', () => handleOpenCard(data.name, data.link));
  buttonDeleteCard.addEventListener('click', () =>  handleDeleteCard(newCard));
  buttonLikeCard.addEventListener('click', () => handleLikeCard(buttonLikeCard));

  return newCard;
};

// функция создания карточек
const renderCard = (data) => {
  elements.prepend(createNewCard(data));
};

// фукнция с готовым массивом
initialCards.forEach((data) => {
	renderCard(data);
});

// открыть попап редактирования профиля (кнопка "карандаш") 
buttonEditProfile.addEventListener('click', function() {
  bottonSubmitEditProfile.setAttribute('disabled', '');
  bottonSubmitEditProfile.classList.add('popup__submit-button_disable');
  inputUserName.value = userName.textContent;
  inputUserPosition.value = userPosition.textContent;

  openPopup(popupUsernameEdit);
});

// открыть попап добавления новой карточки (кнопка "плюс")
buttonCardAdd.addEventListener('click', function() {
  buttonSubmitAddCard.setAttribute('disabled', '');
  buttonSubmitAddCard.classList.add('popup__submit-button_disable');
  openPopup(popupCardAdd);
});

// закрыть попап редактирования профиля (кнопка "крестик")
buttonClosePopupEditProfile.addEventListener('click', function() {
  closePopup(popupUsernameEdit);
  bottonSubmitEditProfile.setAttribute('disabled', '');
  bottonSubmitEditProfile.classList.add('popup__submit-button_disable');
});

// закрыть попап добавления новой карточки (кнопка "крестик")
buttonClosePopupCardAdd.addEventListener('click', function() {
  closePopup(popupCardAdd);
  buttonSubmitAddCard.setAttribute('disabled', '');
  buttonSubmitAddCard.classList.add('popup__submit-button_disable');
});

// закрыть масштабированную картинку 
buttonClosePopupImageFull.addEventListener('click', function() {
	closePopup(popupImageFullPicture);
});

// добавить данные в попап редоктирования профиля
popupUsernameEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userPosition.textContent = inputUserPosition.value;

  closePopup(popupUsernameEdit);
});

// добавить карточки (кнопка "плюс")
popupCardAdd.addEventListener('submit', (evt) => {
	evt.preventDefault();
  const newCard = {name: inputPhotoName.value, link: inputPhotoLink.value}
  renderCard(newCard);
  inputPhotoName.value = '';
  inputPhotoLink.value = '';

  closePopup(popupCardAdd);
  buttonSubmitAddCard.setAttribute('disabled', '');
  buttonSubmitAddCard.classList.add('popup__submit-button_disable');
});

