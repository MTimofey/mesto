// импорты
import { initialCards } from "./initialCards.js";
import { Card } from "./card.js";
import { FormValidator, classSelector } from "./formValidator.js";

// константы
const popups = document.querySelectorAll('.popup');

const popupUsernameEdit = document.querySelector('.popup_username-edit');
const popupCardAdd = document.querySelector('.popup_card-add');
const elements = document.querySelector('.elements');

const userName = document.querySelector('.profile__title');
const userPosition = document.querySelector('.profile__position');

const formForPopupUsernameEdit = document.forms['contentProfileForm'];
const inputUserName = formForPopupUsernameEdit.elements['userName'];
const inputUserPosition = formForPopupUsernameEdit.elements['userPosition'];

const formForPopupCardAdd = document.forms['contentNewCardForm']
const inputPhotoName = formForPopupCardAdd.elements['photoName'];
const inputPhotoLink = formForPopupCardAdd.elements['link'];

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

const popupUsernameEditValidate = new FormValidator(classSelector, formForPopupUsernameEdit);
popupUsernameEditValidate.enableValidation();
const popupCardAddValidate = new FormValidator(classSelector, formForPopupCardAdd);
popupCardAddValidate.enableValidation();



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

// функция доабвления новой карточки в общий селектор
function makeCard(cardItem) {
  elements.prepend(cardItem);
};

// функция доставания карточки для создания
function getCard(cardData) {
  return new Card(cardData, '#template-elements');
};

// функия создания карточки 
function createCard(cardData) {
  const cardItem = getCard(cardData);
  makeCard(cardItem.getCard());
}

// готовый массив
initialCards.forEach(createCard);

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
  const newCard = {name: inputPhotoName.value, link: inputPhotoLink.value};
  createCard(newCard);
  inputPhotoName.value = '';
  inputPhotoLink.value = '';

  closePopup(popupCardAdd);
  buttonSubmitAddCard.setAttribute('disabled', '');
  buttonSubmitAddCard.classList.add('popup__submit-button_disable');
});

// экспорты  
export { popupImageFullPicture, popupCurrentImage, popupPhotoDescription, openPopup }