import {isEscape} from './utils.js';

let modal;
let closeButton;

let onModalEscape;
let onModalClose;

let onCloseCompletion;

let isLockedForEscape = false;

const setModalEscapeLockTo = (value) => {
  isLockedForEscape = value;
};

const resetModal = () => {
  modal = undefined;
  closeButton = undefined;
  onCloseCompletion = undefined;
  isLockedForEscape = false;
  onModalEscape = undefined;
  onModalClose = undefined;
};

const closeAndResetModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  if (onModalEscape) {
    document.removeEventListener('keydown', onModalEscape);
  }

  if (onModalClose) {
    closeButton.removeEventListener('click', onModalClose);
  }

  if (onCloseCompletion) {
    onCloseCompletion();
  }

  resetModal();
};

const showModal = () => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  onModalClose = () => {
    closeAndResetModal();
  };
  closeButton.addEventListener('click', onModalClose);

  onModalEscape = (evt) => {
    if (isEscape(evt) && !isLockedForEscape) {
      evt.preventDefault();
      closeAndResetModal();
    }
  };
  document.addEventListener('keydown', onModalEscape);
};

const setupAndShowModal = (modalElement, button, closeCompletionHandler) => {
  modal = modalElement;
  closeButton = button;
  showModal();

  if (closeCompletionHandler) {
    onCloseCompletion = closeCompletionHandler;
  }
};

export {setupAndShowModal, setModalEscapeLockTo};
