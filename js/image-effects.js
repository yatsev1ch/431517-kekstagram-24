import {image, imageEffectSlider, imageEffectSliderContainer} from './new-post.js';

let currentEffect;

const sliderOptionsFor = {
  none: {
    range: {min: 0, max: 1},
    start: 1,
  },
  chrome: {
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? +value.toFixed(0) : +value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  },
  sepia: {
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? +value.toFixed(0) : +value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  },
  marvin: {
    range: {min: 0, max: 100},
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => +value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  },
  phobos: {
    range: {min: 0, max: 3},
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? +value.toFixed(0) : +value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  },
  heat: {
    range: {min: 1, max: 3},
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? +value.toFixed(0) : +value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  },
};

const changeImageWith = (newEffect) => {
  if (currentEffect) {
    image.classList.remove(`effects__preview--${currentEffect}`);
  }
  if (newEffect !== 'none') {
    image.classList.add(`effects__preview--${newEffect}`);
    currentEffect = newEffect;
    return;
  }

  currentEffect = undefined;
};

const changeImageEffectTo = (effect) => {
  changeImageWith(effect);
  imageEffectSlider.noUiSlider.updateOptions(sliderOptionsFor[effect]);
  currentEffect ? imageEffectSliderContainer.classList.remove('hidden') : imageEffectSliderContainer.classList.add('hidden');
};

const changeCurrentImageEffectWith = (value) => {
  switch (currentEffect) {
    case 'chrome':
      image.style.webkitFilter = `grayscale(${value})`;
      break;
    case 'sepia':
      image.style.webkitFilter = `sepia(${value})`;
      break;
    case 'marvin':
      image.style.webkitFilter = `invert(${value}%)`;
      break;
    case 'phobos':
      image.style.webkitFilter = `blur(${value}px)`;
      break;
    case 'heat':
      image.style.webkitFilter = `brightness(${value})`;
      break;
    default:
      image.style.webkitFilter = 'unset';
  }
};

export {changeImageEffectTo, changeCurrentImageEffectWith, sliderOptionsFor, currentEffect};
