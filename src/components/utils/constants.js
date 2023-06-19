// константы

const formForPopupUsernameEdit = document.forms['contentProfileForm'];
const inputUserName = formForPopupUsernameEdit.elements['userName'];
const inputUserPosition = formForPopupUsernameEdit.elements['userPosition'];

const formForPopupCardAdd = document.forms['contentNewCardForm'];

const formForPopupAvatarImage = document.forms['userAvatar']

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCardAdd = document.querySelector('.profile__add-button');
const buttonAvatarEdit = document.querySelector('.profile__edit-avatar-button');

const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disable',
  inputErrorClass: 'popup__text_type_error',
}; 

export { formForPopupUsernameEdit, inputUserName, inputUserPosition, formForPopupCardAdd, formForPopupAvatarImage,
  buttonEditProfile, buttonCardAdd, buttonAvatarEdit, validationConfig }