import {setupAndShowModal, setModalEscapeLockTo} from './modal.js';
import {checkHastagsIn, resetHashtagsCharCounter} from './hashtags.js';
import {checkStringLength} from './utils.js';

const MAX_HASHTAG_LENGTH = 19;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_EXPRESSION = /^[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const container = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const closeButton = container.querySelector('.img-upload__cancel');
const previewImage = container.querySelector('.img-upload__preview img');
const hashtagsInput = container.querySelector('.text__hashtags');
const commentInput = container.querySelector('.text__description');
const textContainer = container.querySelector('.img-upload__text');

const defaultImageSrc = previewImage.src;

const onTextInputFocus = () => {
  setModalEscapeLockTo(true);
};

const onTextInputUnfocus = (evt) => {
  setModalEscapeLockTo(false);
  const input = evt.target;
  const emptyEvent = new Event('input');
  input.dispatchEvent(emptyEvent);
};

const onClose = () => {
  fileInput.value = '';
  previewImage.src = defaultImageSrc;
  commentInput.value = '';
  hashtagsInput.value = '';
  resetHashtagsCharCounter();
};

const onCommentInput = () => {
  const isCorrectLength = checkStringLength(commentInput.value, MAX_COMMENT_LENGTH);
  let messageToShow = '';
  if (!isCorrectLength) {
    commentInput.value = commentInput.value.slice(0, -1);
    messageToShow = `Максимальное количество символов ${MAX_COMMENT_LENGTH}`;
  }
  commentInput.setCustomValidity(messageToShow);
  commentInput.reportValidity();
};

fileInput.addEventListener('change', () => {
  setupAndShowModal(container, closeButton, onClose);
  const file = fileInput.files[0];
  previewImage.src = URL.createObjectURL(file);
});

textContainer.addEventListener('focusin', onTextInputFocus);
textContainer.addEventListener('focusout', onTextInputUnfocus);

hashtagsInput.addEventListener('input', () => {
  checkHastagsIn(hashtagsInput);
});

commentInput.addEventListener('input', onCommentInput);

export {MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT, HASHTAG_EXPRESSION};
