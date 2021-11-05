import {resetRadioButtonsTo} from './utils.js';
import {setupAndShowModal} from './modal.js';
import {checkHashtagsIn, resetHashtagsCharCounter} from './hashtags.js';
import {changeImageEffectTo, changeCurrentImageEffectWith, sliderOptionsFor, currentEffect} from './image-effects.js';

const IMAGE_SCALE_STEP = 25;
const MIN_IMAGE_SCALE = 25;
const MAX_IMAGE_SCALE = 100;

const container = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
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

noUiSlider.create(imageEffectSlider, sliderOptionsFor.none);

imageEffectsContainer.addEventListener('change', (evt) => {
  const effect = evt.target.closest('.effects__radio').value;
  changeImageEffectTo(effect);
});

imageEffectSlider.noUiSlider.on('update', (values, handle) => {
  changeCurrentImageEffectWith(values[handle]);
  imageEffectLevel.value = currentEffect ? values[handle] : '';
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
  changeImageEffectTo('none');
  resetRadioButtonsTo('none', imageEffectsRadioButtons);

  commentInput.value = '';
  hashtagsInput.value = '';
  hashtagsInput.setCustomValidity('');
  resetHashtagsCharCounter();
};

fileInput.addEventListener('change', () => {
  setupAndShowModal(container, closeButton, onClose, hashtagsInput, commentInput);
  const file = fileInput.files[0];
  image.src = URL.createObjectURL(file);
});

hashtagsInput.addEventListener('input', () => {
  checkHashtagsIn(hashtagsInput);
});

export {image, imageEffectSlider, imageEffectSliderContainer};
