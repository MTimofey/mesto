// импорты
import { Card } from './card.js';
import { FormValidator } from "./formValidator.js";
import { openPopup, closePopup, setListenerClosePopupByOverlay } from './functions.js';
import { popups, popupsArray, popupUsernameEdit, popupCardAdd, elements,
  userName, userPosition, formForPopupUsernameEdit, inputUserName,
  inputUserPosition, formForPopupCardAdd, inputPhotoName, inputPhotoLink,
  popupImageFullPicture, buttonEditProfile, buttonCardAdd, buttonClosePopupEditProfile,
  buttonClosePopupCardAdd, buttonClosePopupImageFull, bottonSubmitEditProfile,
  buttonSubmitAddCard, formValidators, classSelector, initialCards } from "./constant.js";

const popupUsernameEditValidate = new FormValidator(classSelector, formForPopupUsernameEdit);
popupUsernameEditValidate.enableValidation();
const popupCardAddValidate = new FormValidator(classSelector, formForPopupCardAdd);
popupCardAddValidate.enableValidation();


popupsArray.forEach(setListenerClosePopupByOverlay);

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
  bottonSubmitEditProfile.classList.add('popup__submit-button_disable');
  inputUserName.value = userName.textContent;
  inputUserPosition.value = userPosition.textContent;

  openPopup(popupUsernameEdit);
});

// открыть попап добавления новой карточки (кнопка "плюс")
buttonCardAdd.addEventListener('click', function() {
  formForPopupCardAdd.reset();

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
  buttonSubmitAddCard.classList.add('popup__submit-button_disable');
});

export { openPopup }
