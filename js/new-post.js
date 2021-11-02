import {setupAndShowModal} from './modal.js';
import {checkHashtagsIn, resetHashtagsCharCounter} from './hashtags.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const container = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const closeButton = container.querySelector('.img-upload__cancel');
const previewImage = container.querySelector('.img-upload__preview img');
const hashtagsInput = container.querySelector('.text__hashtags');
const commentInput = container.querySelector('.text__description');

const defaultImageSrc = previewImage.src;

const onClose = () => {
  fileInput.value = '';
  previewImage.src = defaultImageSrc;
  commentInput.value = '';
  hashtagsInput.value = '';
  hashtagsInput.setCustomValidity('');
  resetHashtagsCharCounter();
};

fileInput.addEventListener('change', () => {
  setupAndShowModal(container, closeButton, onClose, hashtagsInput, commentInput);
  const file = fileInput.files[0];
  previewImage.src = URL.createObjectURL(file);
});

hashtagsInput.addEventListener('input', () => {
  checkHashtagsIn(hashtagsInput);
});

export {MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT, HASHTAG_EXPRESSION};
