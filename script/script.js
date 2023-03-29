// константы
const popups = document.querySelectorAll('.popup');

const popupUsernameEdit = document.querySelector('.popup_username-edit');
const popupCardAdd = document.querySelector('.popup_card-add');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#template-elements').content.querySelector('.element');
const popupContent = document.querySelector('.popup__content');
const popupContentCardAdd = document.querySelector('.popup__content_card-add');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCardsAdd = document.querySelector('.profile__add-button');
const buttonCreatCard = document.querySelector('.popup__creat-button');

const userName = document.querySelector('.profile__title');
const userPosition = document.querySelector('.profile__position');
const inputUserName = document.querySelector('.popup__text_username');
const inputUserPosition = document.querySelector('.popup__text_user-position');
const inputPhotoName = document.querySelector('.popup__text_photo-name');
const inputPhotoLink = document.querySelector('.popup__text_photo-link');

const popupFullPictute = document.querySelector('.popup_full-img');
const popupImage = popupFullPictute.querySelector('.popup__img');
const popupDescription = popupFullPictute.querySelector('.popup__description');

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
  }
];



// функция открытия попапа
function openPopup(popup){
  popup.classList.add('popup__opened');
};

// функция закрытия попапа 
function closePopup(){
  document.querySelector('.popup__opened').classList.remove('popup__opened');
};

// открыть попап редактирования профиля (кнопка "карандаш") 
buttonEditProfile.addEventListener('click', function (){
  openPopup(popupUsernameEdit);
});

// открыть попап добавления новой карточки (кнопка "плюс")
buttonCardsAdd.addEventListener('click', function(){
  openPopup(popupCardAdd);
});

// закрыть попап редактирования профиля (кнопка "крестик")
popupUsernameEdit.querySelector('.popup__close-button').addEventListener('click', closePopup);

// закрыть попап добавления новой карточки (кнопка "крестик")
popupCardAdd.querySelector('.popup__close-button').addEventListener('click', closePopup);

// функция добавления данных в попап редоктирования профиля
popupUsernameEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userPosition.textContent = inputUserPosition.value;
  inputUserName.value = '';
  inputUserPosition.value = '';

  closePopup();
});

// добавление карточек (кнопка "плюс")
buttonCreatCard.addEventListener("click", (evt) => {
	evt.preventDefault();
	const newCard = {name: inputPhotoName.value, link: inputPhotoLink.value}
    renderCard(newCard);
    inputPhotoName.value = '';
    inputPhotoLink.value = '';

    closePopup(popupCardAdd);
});

// функция создания карточки
function createNewCard (data) {
  const newCard = elementsTemplate.cloneNode(true);
  newCard.querySelector('.element__title').textContent = data.name;
  newCard.querySelector('.element__image').src = data.link;
  newCard.querySelector('.element__image').addEventListener('click', handleOpenCard);
  newCard.querySelector('.element__delete-button').addEventListener('click', handleDeleteCard);
  newCard.querySelector('.element__like-button').addEventListener('click', handleLikeCard);

  return newCard;
};

// функция открытия карточки
const handleOpenCard = (evt) => {
	const newCard = evt.target.closest('.element');
	popupImage.src = evt.target.src;
	popupDescription.textContent = newCard.querySelector('.element__title').textContent;

  openPopup(popupFullPictute);
};

// функция закрытия картинки
popupFullPictute.querySelector('.popup__close-button').addEventListener('click', function(){
	closePopup();
});

// функция удаления карточки
const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove();
};

// функция лайка 
const handleLikeCard = (evt) => {
	evt.target.closest('.element__like-button').classList.toggle('element__like-button_active');
};

// функция создания карточек
const renderCard = (data) => {
  elements.prepend(createNewCard(data));
};

// фукнция с готовым массивом
initialCards.forEach((data) => {
	renderCard(data);
});
