import {resetRadioButtonsTo} from './utils.js';
import {setupAndShowModal, closeAndResetModal} from './modal.js';
import {performHTTPRequest} from './network.js';
import {showNotification} from './notifications.js';
import {checkHashtagsIn, resetHashtagsCharCounter} from './hashtags.js';
import {changeImageEffectTo, changeCurrentImageEffectWith, sliderOptions, getCurrentEffect} from './image-effects.js';

const IMAGE_SCALE_STEP = 25;
const MIN_IMAGE_SCALE = 25;
const MAX_IMAGE_SCALE = 100;

const SERVER_URL = 'https://24.javascript.pages.academy/kekstagram';

const container = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const closeButton = container.querySelector('.img-upload__cancel');

const image = container.querySelector('.img-upload__preview img');
const imageScaleContainer = container.querySelector('.img-upload__scale');
const imageScalePlusButton = container.querySelector('.scale__control--bigger');
const imageScaleMinusButton = container.querySelector('.scale__control--smaller');
const imageScale = container.querySelector('.scale__control--value');
const imageScaleValue = container.querySelector('.scale__control--hidden-value');
const imageEffectsContainer = container.querySelector('.img-upload__effects');
const imageEffectsRadioButtons = imageEffectsContainer.querySelectorAll('.effects__radio');
const imageEffectSliderContainer = container.querySelector('.img-upload__effect-level');
const imageEffectSlider = container.querySelector('.effect-level__slider');
const imageEffectLevel = container.querySelector('.effect-level__value');

const hashtagsInput = container.querySelector('.text__hashtags');
const commentInput = container.querySelector('.text__description');

const defaultImageSrc = image.src;

noUiSlider.create(imageEffectSlider, sliderOptions.none);

imageEffectsContainer.addEventListener('change', (evt) => {
  const effect = evt.target.closest('.effects__radio').value;
  changeImageEffectTo(effect, image, imageEffectSlider, imageEffectSliderContainer);
});

imageEffectSlider.noUiSlider.on('update', (values, handle) => {
  changeCurrentImageEffectWith(values[handle], image);
  imageEffectLevel.value = getCurrentEffect() ? values[handle] : '';
});

const changeImageScaleTo = (value) => {
  image.style.transform = `scale(${value / 100})`;
  imageScale.value = `${value}%`;
  imageScaleValue.value = value;
};

imageScaleContainer.addEventListener('click', (evt) => {
  let scale = +imageScaleValue.value;

  if (evt.target === imageScalePlusButton && scale < MAX_IMAGE_SCALE) {
    scale += IMAGE_SCALE_STEP;
  }

  if (evt.target === imageScaleMinusButton && scale > MIN_IMAGE_SCALE) {
    scale -= IMAGE_SCALE_STEP;
  }

  changeImageScaleTo(scale);
});

const onClose = () => {
  fileInput.value = '';

  image.src = defaultImageSrc;
  changeImageScaleTo(MAX_IMAGE_SCALE);
  changeImageEffectTo('none', image, imageEffectSlider, imageEffectSliderContainer);
  resetRadioButtonsTo('none', imageEffectsRadioButtons);

  commentInput.value = '';
  hashtagsInput.value = '';
  hashtagsInput.setCustomValidity('');
  resetHashtagsCharCounter();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  closeAndResetModal();
  performHTTPRequest(SERVER_URL, () => {
    showNotification('success');
  }, () => {
    showNotification('error');
  }, 'POST', {body: formData});
});

fileInput.addEventListener('change', () => {
  setupAndShowModal(container, closeButton, onClose, hashtagsInput, commentInput);
  const file = fileInput.files[0];
  image.src = URL.createObjectURL(file);
});

hashtagsInput.addEventListener('input', () => {
  checkHashtagsIn(hashtagsInput);
});

export {image, imageEffectSlider, imageEffectSliderContainer};
