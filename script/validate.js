// функция если система прошла валидацию форм
function setValidateStatusOn({inputErrorClass}, input, errorElement) {
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

// функция если система НЕ прошла валидацию форм
function setValidateStatusOff({inputErrorClass}, input, errorElement) {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
};

// функция проверки формы на валидность
function checkInputValidity({inputErrorClass}, input) {
  const errorElement = document.querySelector(`#error-${input.id}`);

  if(input.checkValidity()) {
    setValidateStatusOn(inputErrorClass, input, errorElement);
  } else {
    setValidateStatusOff(inputErrorClass, input, errorElement);
  };
};

// функция разблокировки кнопки отправки формы 
function enableButton({inactiveButtonClass}, button) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
};

// функция блокировки кнопки отправки формы 
function disableButton({inactiveButtonClass}, button) {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
};

// функция проверки кнопки работы кнопки из функции проверки на валидность
function toggleButtonValidity({submitButtonSelector, ...rest}, form) {
  const submitButton = form.querySelector(submitButtonSelector);

  if (form.checkValidity ()) {
    enableButton(rest, submitButton);
  } else {
    disableButton(rest, submitButton);
  };
};

// функция для работы с формами и инпутами в форме
function enableValidation({formSelector, inputSelector, ...rest}) {
  const popupForm = document.querySelectorAll(formSelector);
  const popupFormArray = Array.from(popupForm);

  popupFormArray.forEach(function(form) {
    form.addEventListener('submit', function(evt){
    });

  // toggleButtonValidity(rest, form)

  const inputs = form.querySelectorAll(inputSelector);
  const inputsArray = Array.from(inputs);

  inputsArray.forEach(function(input) {
    input.addEventListener('input', () => {
      checkInputValidity(rest, input);
      toggleButtonValidity(rest, form);
    });
  });
});
};

// объект с включением валидаций всех форм
enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disable',
  inputErrorClass: 'popup__text_type_error',
});
