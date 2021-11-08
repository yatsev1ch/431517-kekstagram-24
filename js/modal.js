import {isEscape, checkForActiveElementsIn} from './utils.js';

let modal;
let closeButton;

let onModalEscape;
let onModalClose;

let onCloseCompletion;

const resetModal = () => {
  modal = undefined;
  closeButton = undefined;
  onCloseCompletion = undefined;
  onModalEscape = undefined;
  onModalClose = undefined;
};

const closeAndResetModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscape);
  closeButton.removeEventListener('click', onModalClose);

  if (onCloseCompletion) {
    onCloseCompletion();
  }

  resetModal();
};

const showModal = (inputsWithFocus) => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  onModalClose = () => {
    closeAndResetModal();
  };
  closeButton.addEventListener('click', onModalClose);

  onModalEscape = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      if (checkForActiveElementsIn(inputsWithFocus)) {
        return;
      }
      closeAndResetModal();
    }
  };
  document.addEventListener('keydown', onModalEscape);
};

const setupAndShowModal = (modalElement, button, closeCompletionHandler, ...inputsWithFocus) => {
  modal = modalElement;
  closeButton = button;
  showModal(inputsWithFocus);

  if (closeCompletionHandler) {
    onCloseCompletion = closeCompletionHandler;
  }
};

export {setupAndShowModal, closeAndResetModal};
