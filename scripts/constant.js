// константы
const popups = document.querySelectorAll('.popup');
const popupsArray = Array.from(popups);

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

const formValidators = {};

const classSelector = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disable',
  inputErrorClass: 'popup__text_type_error',
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  }, 
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Какой-то мужик',
    link: 'https://images.unsplash.com/photo-1680738498389-55af103d8eab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }, 
  {
    name: 'Умиротворение',
    link: 'https://images.unsplash.com/photo-1680582742810-164f11a8cefa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Отдых на пляже',
    link: 'https://images.unsplash.com/photo-1680553362060-9ed111958ada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Рука-телефон',
    link: 'https://images.unsplash.com/photo-1680462155145-0152dc0646dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Собор в Дании',
    link: 'https://images.unsplash.com/photo-1680742065565-3bdca8ac6dcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Китайский фонарь',
    link: 'https://images.unsplash.com/photo-1680695917815-6431604e1d3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
]; 

export { popups, popupsArray, popupUsernameEdit, popupCardAdd, elements,
  userName, userPosition, formForPopupUsernameEdit, inputUserName,
  inputUserPosition, formForPopupCardAdd, inputPhotoName, inputPhotoLink,
  popupImageFullPicture, popupCurrentImage, popupPhotoDescription,
  buttonEditProfile, buttonCardAdd, buttonClosePopupEditProfile, buttonClosePopupCardAdd,
  buttonClosePopupImageFull, formValidators, classSelector, initialCards }