function setInputValidState(config, input, errorElement) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

function setInputInvalidState(config, input, errorElement) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;

}


function checkInputValidity(config, input) {
  const errorElement = form.querySelector(`#error-${input.id}`);
  if (input.checkValidity()) {
      setInputValidState(config, input, errorElement);
  } else {
      setInputInvalidState(config, input, errorElement);
  }   
}

function disableButton({ inactiveButtonClass }, button) {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}

function enableButton({ inactiveButtonClass }, button) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
}

function toggleButtonValidity({ submitButtonSelector, ...rest }, form) {
  const submitButton = form.querySelector(submitButtonSelector);

  if (form.checkValidity()) {
      enableButton(rest, submitButton);
  } else {
      disableButton(rest, submitButton);
  }
}


function setSubmitListener(config, form) {
  form.addEventListener('submit', function (event) {
      event.preventDefault();

      // тут какие-то действия при отправке
      toggleButtonValidity(config, form);
  });
}

function enableValidation({ formSelector, inputSelector, ...rest}) {
  const form = document.querySelector(formSelector);
  console.log(form);
  
  setSubmitListener(rest, form);
  toggleButtonValidity(rest, form);

  const inputs = form.querySelectorAll(inputSelector);
  const inputsArray = Array.from(inputs);

  inputsArray.forEach(function (input) {
      input.addEventListener('input', () => {
          checkInputValidity(rest, input);
          toggleButtonValidity(rest, form);
         
      });
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__btn',
  inactiveButtonClass: 'input__btn_disabled',
  inputErrorClass: 'input__text_invalid',
  errorClass: 'error-message_visible'
}); 