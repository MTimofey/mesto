// переменная с классами
let classSelector = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disable',
  inputErrorClass: 'popup__text_type_error',
};

// класс с конструктором для валидации полей
class FormValidator {
  constructor(classSelector, formElement) {
    this.classSelector = classSelector;
    this.formElement = formElement;
    this.submitButton = this.formElement.querySelector(this.classSelector.submitButtonSelector);
    this.inputs = this.formElement.querySelectorAll(this.classSelector.inputSelector);
    this.inputsArray = Array.from(this.inputs);
    this.inputFields = this.inputsArray.map((input) => ({
      input: input,
      error: this.formElement.querySelector(`#error-${input.id}`),
    }));
  }

  // функция разблокировки кнопки отправки формы 
  _enableButton() {
  this.submitButton.removeAttribute('disabled');
  this.submitButton.classList.remove(this.classSelector.inactiveButtonClass);
  };

  // функция блокировки кнопки отправки формы 
  _disableButton() {
  this.submitButton.setAttribute('disabled', '');
  this.submitButton.classList.add(this.classSelector.inactiveButtonClass);
  };

  // функция проверки кнопки работы кнопки из функции проверки на валидность
  _toggleButton = () => {
    if (this.formElement.checkValidity()) {
      this._enableButton(this.classSelector, this.submitButton);
    } else {
      this._disableButton(this.classSelector, this.submitButton);
    }
  };

  // функция если система прошла валидацию форм
  _setValidateStatusOn = (inputField) => {
    inputField.input.classList.remove(this.classSelector.inputErrorClass);
    inputField.error.textContent = '';
  };
  
  // функция если система НЕ прошла валидацию форм
  _setValidateStatusOff = (inputField) => {
    inputField.input.classList.add(this.classSelector.inputErrorClass);
    inputField.error.textContent = inputField.input.validationMessage;
  };
  
  // функция проверки формы на валидность
  _checkInputValidity = (inputField) => {
    if(inputField.input.checkValidity()) {
      this._setValidateStatusOn(inputField);
    } else {
      this._setValidateStatusOff(inputField);
    };
  };

  // функция для работы с полями
  _setListeners = () => {
    this.inputFields.forEach((inputField) => {
      inputField.input.addEventListener('input', () => {
        this._checkInputValidity(inputField);
        this._toggleButton(this.classSelector, this.formElement);
      });
    });
  };

  enableValidation = () => {
    this._setListeners();
    this._toggleButton();
  };
}

export { FormValidator, classSelector };
