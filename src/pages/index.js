// импорты
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { formForPopupUsernameEdit, inputUserName, inputUserPosition, formForPopupCardAdd,
  buttonEditProfile, buttonCardAdd, validationConfig, initialCards } from "../utils/constants.js";

import './index.css';

// функции, которые вополняются по ходу проекта

// функция валидирования карточки юзера
const popupUsernameEditValidate = new FormValidator(validationConfig, formForPopupUsernameEdit);

// функция валидирования карточки добаления юзера
const popupCardAddValidate = new FormValidator(validationConfig, formForPopupCardAdd);

// функция заполенния картички с картинкой данными (зум картинки)
const fullPopupWithImage = new PopupWithImage('.popup_full-img');

// функция открытия карточки с картинкой (зум картинки)
const handleOpenCard = (cardData) => fullPopupWithImage.openPopup(cardData);

// фукнция создание новой карточки с фотографие/картинкой
const createCard = (...rest) => new Card(...rest).getCard();

// функция добавление данных для новой карточки с картнкой
const renderCard = (data) => {
  const newOrdCard = createCard(data, "#template-elements", handleOpenCard);
  
  cardsSection.addItem(newOrdCard);
};

// функция инициализации объекта с готовыми карточками
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  '.elements',
);

// функция работы с редактированием полей данных профиля
const cardUserInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserPosition: '.profile__position',
});

// фукнция работы (наполнение данных и закрытие) профиля
const cardPopupWithFormUserNameEdit = new PopupWithForm('.popup_username-edit', {
  callbackSubmitForm: (userInfo) => {
    cardUserInfo.setUserInfo({ userName: userInfo['userName'], userPosition: userInfo['userPosition'] });
    
    
    cardPopupWithFormUserNameEdit.closePopup();
  },
});

// функция синхронизирования данных в профиле
const openEditProfilePopup = () => {
  const userData = cardUserInfo.getUserInfo();
  
  inputUserName.value = userData.userName;
  inputUserPosition.value = userData.userPosition;
  
  popupUsernameEditValidate.disableButton();
  cardPopupWithFormUserNameEdit.openPopup();
};

// функция работы (наполнение данных, ссылки и закрытие) с попапом доабвления карточек 
const cardPopupWithFormCardAdd = new PopupWithForm('.popup_card-add', {
  callbackSubmitForm: (cardData) => {
    const cardDataForm = {
      name: cardData['photoName'],
      link: cardData['link'],
    };
    const cardOrd = createCard(cardDataForm, '#template-elements', handleOpenCard);
    cardsSection.addItem(cardOrd);
    
    cardPopupWithFormCardAdd.closePopup();
  },
});

// функция очистки полей данных в попапе добавления карточек
const openAddCardPopup = () => {
  popupCardAddValidate.disableButton();
  formForPopupCardAdd.reset();
  cardPopupWithFormCardAdd.openPopup();
};

// реализация добаления функций 

// создания карточек из объекта
cardsSection.renderItems();

// навешивание слушателей на карточку с картинкой
fullPopupWithImage.setEventListeners();

// валидация форм редактирования профиля
popupUsernameEditValidate.enableValidation();

// валидация форм создания карточки
popupCardAddValidate.enableValidation();

// навешивание слушателей на редактирование формы
cardPopupWithFormUserNameEdit.setEventListeners();

// навешивания слушателя на кнопку редактирования профиля (кнопка "карандаш")
buttonEditProfile.addEventListener('click', () => openEditProfilePopup());

// навешивание слушателей на создание карточки 
cardPopupWithFormCardAdd.setEventListeners();

// навешивание слушателя на кнопку создания карточек (кнопка "плюс")
buttonCardAdd.addEventListener('click', () => openAddCardPopup());
