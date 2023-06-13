// импорты
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { formForPopupUsernameEdit, inputUserName, inputUserPosition, formForPopupCardAdd,
  buttonEditProfile, buttonCardAdd, classSelector, initialCards } from "../utils/constants.js";

import './index.css';

const popupUsernameEditValidate = new FormValidator(classSelector, formForPopupUsernameEdit);
popupUsernameEditValidate.enableValidation();
const popupCardAddValidate = new FormValidator(classSelector, formForPopupCardAdd);
popupCardAddValidate.enableValidation();

const handleOpenCard = (cardAdd) => fullPopupWithImage.openPopup(cardAdd);

const fullPopupWithImage = new PopupWithImage('.popup_full-img');
fullPopupWithImage.setEventListeners();

const createCard = (...rest) => new Card(...rest).getCard();
const renderCard = (data) => {
  const newOrdCard = createCard(data, "#template-elements", handleOpenCard);

  cardsSection.addItem(newOrdCard);
};

// инициализация объекта с готовыми карточками
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  '.elements'
);

cardsSection.renderItems();

// работа с редактированием профиля
const cardUserInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserPosition: '.profile__position',
});

const cardPopupWithFormUserNameEdit = new PopupWithForm('.popup_username-edit', {
  callbackSubmitForm: (userInfo) => {
    cardUserInfo.setUserInfo({ userName: userInfo['userName'], userPosition: userInfo['userPosition'] });

    popupUsernameEditValidate.disableButton()
    cardPopupWithFormUserNameEdit.closePopup();
  },
});

cardPopupWithFormUserNameEdit.setEventListeners();
 
buttonEditProfile.addEventListener('click', () => {
  const userData = cardUserInfo.getUserInfo();
  
  inputUserName.value = userData.userName;
  inputUserPosition.value = userData.userPosition;
  
  popupUsernameEditValidate.disableButton();
  cardPopupWithFormUserNameEdit.openPopup();
});

// работа с созданием новой карточки
// const handleSubmitCardAdd = (cardData) => {
//   const cardDataForm = {
//     name: cardData.name,
//     link: cardData.link,
//   };
  
//   const cardOrd = new Card(cardDataForm, '#template-elements', handleOpenCard);
//   cardsSection.addItem(cardOrd.getCard());
  
//   popupUsernameEditValidate.disableButton();
//   cardPopupWithFormCardAdd.closePopup();
// }

// const cardPopupWithFormCardAdd = new PopupWithForm('.popup_card-add', (cardData) => {
//   handleSubmitCardAdd(cardData);
// });

const cardPopupWithFormCardAdd = new PopupWithForm('.popup_card-add', {
  callbackSubmitForm: (cardData) => {
    const cardDataForm = {
      name: cardData.name,
      link: cardData.link,
    };
    const cardOrd = new Card(cardDataForm, '#template-elements', handleOpenCard);
    cardsSection.addItem(cardOrd.getCard());

    popupUsernameEditValidate.disableButton();
    cardPopupWithFormCardAdd.closePopup();
  }
})

cardPopupWithFormCardAdd.setEventListeners();

buttonCardAdd.addEventListener('click', () => {
  popupCardAddValidate.disableButton();
  formForPopupCardAdd.reset();
  cardPopupWithFormCardAdd.openPopup();
});
