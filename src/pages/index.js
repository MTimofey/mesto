// импорт
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupConfirmDelete } from "../components/PopupConfirmDelete.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { formForPopupUsernameEdit, inputUserName, inputUserPosition, formForPopupCardAdd, formForPopupAvatarImage,
  buttonEditProfile, buttonCardAdd, buttonAvatarEdit, validationConfig } from "../components/utils/constants.js";
import { apiAuthorizationToken } from "../components/utils/apiAuthorizationToken.js";
import './index.css';

// функции, которые вополняются по ходу проекта

// функция валидирования карточки юзера
const popupUsernameEditValidate = new FormValidator(validationConfig, formForPopupUsernameEdit);

// функция валидирования карточки добаления картинки
const popupCardAddValidate = new FormValidator(validationConfig, formForPopupCardAdd);

// функция валидирования карточки добавления фотографии в профиль
const popupAvatarImageValidate = new FormValidator(validationConfig, formForPopupAvatarImage);

// функция токена
const api = new Api(apiAuthorizationToken);

// функция работы с редактированием полей данных профиля
const cardUserInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserPosition: '.profile__position',
  selectorAvatar: '.profile__avatar',
});

let userId;

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    cardUserInfo.setUserInfo(userData);
    cardUserInfo.setAvatar(userData.avatar);
    cardsSection.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

// функция инициализации объекта с готовыми карточками
const cardsSection = new Section(
  {
    renderer: (cardData) => {
      const newOrdCard = createCard(cardData);

      cardsSection.addItem(newOrdCard);
    },
  },
  '.elements',
);

// фукнция работы (наполнение данных и закрытие) профиля
const cardPopupWithFormUserNameEdit = new PopupWithForm('.popup_username-edit', (newUserInfo) => {
  cardPopupWithFormUserNameEdit.loadingConfirm(true);
  api
    .editCustomProfile(newUserInfo)
    .then((res) => {
      cardUserInfo.setUserInfo(res);
      cardPopupWithFormUserNameEdit.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopupWithFormUserNameEdit.loadingConfirm(false, 'Сохранить');
    });
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
const cardPopupWithFormCardAdd = new PopupWithForm('.popup_card-add', (cardData) => {
  cardPopupWithFormCardAdd.loadingConfirm(true);

  api
    .addNewCard(cardData)
    .then((res) => {
      const cardOrd = createCard(res);
      cardsSection.addItem(cardOrd);

      cardPopupWithFormCardAdd.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopupWithFormCardAdd.loadingConfirm(false, 'Создать');
    });
});

// функция увеличения картинки
const cardPopupWithImage = new PopupWithImage('.popup_full-img');

// функция обработки иконки 
const popupAvatar = new PopupWithForm('.popup_edit-avatar', (avatarLink) => {
  popupAvatar.loadingConfirm(true);
  api
    .updateAvatar({ avatar: avatarLink['avatarPicture'] })
    .then((res) => {
      cardUserInfo.setAvatar(res.avatar);
      popupAvatar.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.loadingConfirm(false, 'Сохранить');
    });
});

const openEditAvatar = () => {
  popupAvatarImageValidate.disableButton();
  popupAvatar.openPopup();
}

// функция удаления картчоки
const cardPopupConfirmDelete = new PopupConfirmDelete('.popup_delete-card', (thisCard) => {
  cardPopupConfirmDelete.loadingConfirm(true);
  api
  .deleteCard(thisCard.cardObj._id)
  .then((res) => {
    thisCard.cardDom.remove();
    cardPopupConfirmDelete.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    cardPopupConfirmDelete.loadingConfirm(false, 'Да');
  });
});

// функция очистки полей данных в попапе добавления карточек
const openAddCardPopup = () => {
  popupCardAddValidate.disableButton();
  cardPopupWithFormCardAdd.openPopup();
};

// функция создания карточки
function createCard(item) {
  const newCard = new Card(
    {
      cardData: item,
      userId: userId,
      handleImageClick: (name, link) => {
        cardPopupWithImage.openPopup(name, link);
      },
      handleDeleteCard: (card) => {
        cardPopupConfirmDelete.openPopup(card);
      },
      handleLikeCard: (thisCardId) => {
        if (!newCard.pressLikeCard()) {
          api
          .setCardLike(thisCardId)
          .then((res) => {
            newCard.countLikeCard(res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          api
          .deleteCardLike(thisCardId)
          .then((res) => {
            newCard.countLikeCard(res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      },
    },
    '#template-elements'
    );
    
    const cardElement = newCard.getCard();
    return cardElement;
  }
  // реализация добаления функций 
  
  // валидация форм фотографии
  popupAvatarImageValidate.enableValidation();
  
  // валидация форм редактирования профиля
  popupUsernameEditValidate.enableValidation();
  
  // валидация форм создания карточки
  popupCardAddValidate.enableValidation();
  
  // навешивание слушателей на редактирование формы
  cardPopupWithFormUserNameEdit.setEventListeners();

  // навешивание слушателя на кнопку редактировать аватар
  buttonAvatarEdit.addEventListener('click', () => openEditAvatar())
  
  // навешивания слушателя на кнопку редактирования профиля (кнопка 'карандаш")
  buttonEditProfile.addEventListener('click', () => openEditProfilePopup());
  
  // навешивание слушателей на создание карточки 
  cardPopupWithFormCardAdd.setEventListeners();
  
  // навешивание слушателя на кнопку создания карточек (кнопка "плюс")
  buttonCardAdd.addEventListener('click', () => openAddCardPopup());
  
  // навешивание слушателей на карточку с картинкой
  cardPopupWithImage.setEventListeners();
  
  // навешивание слушателей на карточку сохранения
  cardPopupConfirmDelete.setEventListeners();
  
  // навешивание слушателей на карточку аватара
  popupAvatar.setEventListeners();