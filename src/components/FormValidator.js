// класс с конструктором для валидации полей
class FormValidator {
  constructor(classSelector, formElement) {
    this._classSelector = classSelector;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._classSelector.submitButtonSelector);
    this._inputs = this._formElement.querySelectorAll(this._classSelector.inputSelector);
    this._inputsArray = Array.from(this._inputs);
    this._inputFields = this._inputsArray.map((input) => ({
      input: input,
      error: this._formElement.querySelector(`#error-${input.id}`),
    }));
  }

  // функция разблокировки кнопки отправки формы 
  _enableButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._classSelector.inactiveButtonClass);
  };

  // функция блокировки кнопки отправки формы
  disableButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._classSelector.inactiveButtonClass);
  };

  // функция проверки кнопки работы кнопки из функции проверки на валидность
  _toggleButton = () => {
    if (this._formElement.checkValidity()) {
      this._enableButton();
    } else {
      this.disableButton();
    }
  };

  // функция если система прошла валидацию форм
  _setValidateStatusOn = (inputField) => {
    inputField.input.classList.remove(this._classSelector.inputErrorClass);
    inputField.error.textContent = '';
  };

  // функция если система НЕ прошла валидацию форм
  _setValidateStatusOff = (inputField) => {
    inputField.input.classList.add(this._classSelector.inputErrorClass);
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
    this._toggleButton();
    this._inputFields.forEach((inputField) => {
      inputField.input.addEventListener('input', () => {
        this._checkInputValidity(inputField);
        this._toggleButton();
      });
    });
  };

  enableValidation = () => {
    this._setListeners();
  };
}

// экспорты
export { FormValidator }
