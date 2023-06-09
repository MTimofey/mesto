// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup__opened'); 
  document.addEventListener('keydown', closePopupByEsc);
  setListenerClosePopupByOverlay(popup)
};

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

// функция закрытия попапа через Esc 
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupVisible = document.querySelector('.popup__opened');
    closePopup(popupVisible);
  }
};

// функция закрытия попапа по клику вне папапа (Overlay)
function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};

function setListenerClosePopupByOverlay(popupName) {
  popupName.addEventListener("click", closePopupByOverlay);
};

export { openPopup, closePopup };
