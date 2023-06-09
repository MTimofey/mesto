// импорты
import { Card } from './card.js';
import { FormValidator } from "./formValidator.js";
import { openPopup, closePopup } from './functions.js';
import { popups, popupsArray, popupUsernameEdit, popupCardAdd, elements,
  userName, userPosition, formForPopupUsernameEdit, inputUserName,
  inputUserPosition, formForPopupCardAdd, inputPhotoName, inputPhotoLink,
  popupImageFullPicture, buttonEditProfile, buttonCardAdd, buttonClosePopupEditProfile,
  buttonClosePopupCardAdd, buttonClosePopupImageFull,
  formValidators, classSelector, initialCards } from "./constant.js";
  
const popupUsernameEditValidate = new FormValidator(classSelector, formForPopupUsernameEdit);
popupUsernameEditValidate.enableValidation();
const popupCardAddValidate = new FormValidator(classSelector, formForPopupCardAdd);
popupCardAddValidate.enableValidation();



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
};

// готовый массив
initialCards.forEach(createCard);


// Работа с редактированием профиля

// открыть попап редактирования профиля (кнопка "карандаш") 
buttonEditProfile.addEventListener('click', function() {
  inputUserName.value = userName.textContent;
  inputUserPosition.value = userPosition.textContent;

  popupUsernameEditValidate.disableButton()
  openPopup(popupUsernameEdit);
});

// добавить данные в попап редоктирования профиля
formForPopupUsernameEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userPosition.textContent = inputUserPosition.value;

  popupUsernameEditValidate.disableButton()
  closePopup(popupUsernameEdit);
});

// закрыть попап редактирования профиля (кнопка "крестик")
buttonClosePopupEditProfile.addEventListener('click', function() {
  popupUsernameEditValidate.disableButton()
  closePopup(popupUsernameEdit);
});


// Работа с доабвлением карточки

// открыть попап добавления новой карточки (кнопка "плюс")
buttonCardAdd.addEventListener('click', function() {
  formForPopupCardAdd.reset();

popupCardAddValidate.disableButton();
  openPopup(popupCardAdd);
});

// добавить карточки (кнопка "плюс")
formForPopupCardAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {name: inputPhotoName.value, link: inputPhotoLink.value};
  createCard(newCard);
  inputPhotoName.value = '';
  inputPhotoLink.value = '';
  
  evt.target.reset();

  popupCardAddValidate.disableButton();
  closePopup(popupCardAdd);
});

// закрыть попап добавления новой карточки (кнопка "крестик")
buttonClosePopupCardAdd.addEventListener('click', function() {
  popupCardAddValidate.disableButton();
  closePopup(popupCardAdd);
});


// закрыть масштабированную картинку 
buttonClosePopupImageFull.addEventListener('click', function() {
	closePopup(popupImageFullPicture);
});

// экспорт
export { openPopup }
