import {setupAndShowModal} from './modal.js';
import {checkHastagsIn, resetHashtagsCharCounter} from './hashtags.js';
import {checkStringLength} from './utils.js';

const MAX_HASHTAG_LENGTH = 20;
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

const onClose = () => {
  fileInput.value = '';
  previewImage.src = defaultImageSrc;
  commentInput.value = '';
  hashtagsInput.value = '';
  resetHashtagsCharCounter();
};

fileInput.addEventListener('change', () => {
  setupAndShowModal(container, closeButton, onClose, hashtagsInput, commentInput);
  const file = fileInput.files[0];
  previewImage.src = URL.createObjectURL(file);
});

textContainer.addEventListener('focusout', (evt) => {
  const input = evt.target;
  const emptyEvent = new Event('input');
  input.dispatchEvent(emptyEvent);
});

hashtagsInput.addEventListener('input', () => {
  checkHastagsIn(hashtagsInput);
});

commentInput.addEventListener('input', () => {
  const isCorrectLength = checkStringLength(commentInput.value, MAX_COMMENT_LENGTH);
  let messageToShow = '';
  if (!isCorrectLength) {
    commentInput.value = commentInput.value.slice(0, -1);
    messageToShow = `Максимальное количество символов ${MAX_COMMENT_LENGTH}`;
  }
  commentInput.setCustomValidity(messageToShow);
  commentInput.reportValidity();
});

export {MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT, HASHTAG_EXPRESSION};
