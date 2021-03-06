import {checkArrayForDuplicate} from './utils.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

let hashtagsCharCounter = 0;

const createHashtagsFrom = (input, editingState) => {
  const inputString = input.value;
  const lastChar = inputString.slice(-1);

  let stringToSplit = inputString.toLowerCase().replace(/\s\s/, ' ');

  switch (true) {
    case editingState === 'typing' && lastChar === ' ':
      stringToSplit += '#';
      break;
    case editingState === 'typing' && lastChar === '#' && inputString.length !== 1:
      stringToSplit = stringToSplit.slice(0, -1);
      stringToSplit += ' #';
      break;
  }
  stringToSplit = stringToSplit.trim().trimStart();
  const hashtags = stringToSplit.split(' ');

  return hashtags;
};

const getTagsCountErrorString = (hashtags) => hashtags.length > MAX_HASHTAG_COUNT ? `Слишком много хештегов. Максимальное количество хештегов - ${MAX_HASHTAG_COUNT}` : '';

const getExpressionErrorString = (hashtags) => {
  let errorMessage = '';
  hashtags.forEach((hashtag) => {
    if (!HASHTAG_EXPRESSION.test(hashtag)) {
      switch (true) {
        case hashtag.length > MAX_HASHTAG_LENGTH:
          errorMessage =  `Хештег '${hashtag}' слишком длинный. Хештег не может содержать больше ${MAX_HASHTAG_LENGTH} символов`;
          break;
        case hashtag[0] !== '#' && hashtag.length !== 0:
          errorMessage = 'Хештег должен начинаться с символа #';
          break;
        case hashtag[0] === '#' && hashtag.length === 1:
          errorMessage = 'Хештег не может быть пустым';
          break;
        default:
          for (let charIterator = 0; charIterator < hashtag.length; charIterator++ ) {
            const char = hashtag[charIterator];
            const testChar = `#${char}`;
            if (!HASHTAG_EXPRESSION.test(testChar) && charIterator !== 0) {
              errorMessage = `Хештег '${hashtag}' содержит недопустимый символ '${char}'`;
              break;
            }
          }
      }
    }
  });
  return errorMessage;
};

const getDuplicateErrorString = (hashtags) => {
  const hashtag = checkArrayForDuplicate(hashtags);
  return hashtag ?  `Хештег '${hashtag}' уже существует` :  '';
};

const resetHashtagsCharCounter = () => {
  hashtagsCharCounter = 0;
};

const createInputValueFrom = (hashtags) => hashtags.join(' ');

const checkHashtagsIn = (input) => {
  const inputString = input.value;
  const editingState = inputString.length > hashtagsCharCounter ? 'typing' : undefined;
  let errorMessage = '';

  const hashtags = createHashtagsFrom(input, editingState);

  const expressionErrorString = getExpressionErrorString(hashtags);
  const countErrorString = getTagsCountErrorString(hashtags);
  const duplicateErrorString = getDuplicateErrorString(hashtags);


  for (const errorString of [countErrorString, expressionErrorString, duplicateErrorString]) {
    if (errorString) {
      errorMessage = errorString;
      break;
    }
  }

  input.value = createInputValueFrom(hashtags);
  input.setCustomValidity(errorMessage);

  hashtagsCharCounter = input.value.length;
};

export {checkHashtagsIn, resetHashtagsCharCounter};
