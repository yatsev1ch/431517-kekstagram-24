import {checkStringsForExpression, checkArrayForDuplicate} from './utils.js';
import {MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH, HASHTAG_EXPRESSION} from './new-post.js';

let hashtagsCharCounter;

const checkInputValue = (input, currentString, errorString, isError) => {
  const lastChar = currentString.slice(-1);
  const twoLastChars = currentString.slice(-2);

  const isDeleting = currentString.length < hashtagsCharCounter;
  const isTyping = currentString.length > hashtagsCharCounter;
  let message = '';

  if (isError) {
    switch (true) {
      case errorString.length > 1:
        message = errorString;
        break;
      default:
        message = `В хештеге нельзя использовать символ ${errorString}`;
    }
    input.value = currentString.slice(0, -1);
    return message;
  }

  if (lastChar === '#') {
    switch (true) {
      case twoLastChars === '##' && isTyping:
        input.value = currentString.slice(0, -1);
        message = 'Хештег не должен содержать символ #';
        break;
      case isTyping && currentString.length > 1:
        input.value = currentString.slice(0, -1);
        input.value += ' #';
    }
  }


  if (lastChar === ' ') {
    switch (true) {
      case isDeleting:
        input.value = currentString.slice(0, -1);
        break;
      case isTyping && !isError:
        if (twoLastChars === '# ') {
          input.value = currentString.slice(0, -1);
          message = 'Хештег не должен содержать пробел';
          break;
        }
        input.value += '#';
    }
  }

  return message;

};

const createCurrentHashtagsFrom = (currentString) => {
  let transformedString = currentString.toLowerCase().replace(/\s/g, '');
  switch (true) {
    case transformedString.slice(-2) === '##':
      transformedString = transformedString.slice(0, -2).trim();
      break;
    case transformedString.slice(-1) === '#':
      transformedString = transformedString.slice(0, -1).trim();
  }
  const currentHashtags = transformedString.split('#');
  currentHashtags.shift();
  return currentHashtags;
};

const getHashtagCountErrorString = (hashtagsArray, currentString) => {
  const lastChar = currentString.slice(-1);
  if (hashtagsArray.length >= MAX_HASHTAG_COUNT && (lastChar === ' ' || lastChar === '#')) {
    return `Максимальное количество хештегов - ${MAX_HASHTAG_COUNT}`;
  }
  return '';
};

const getExpressionErrorString = (expressionCheckResult, maxLength) => {
  if (expressionCheckResult === '') {
    return expressionCheckResult;
  }

  if (expressionCheckResult.length <= maxLength) {
    return expressionCheckResult.slice(-1);
  }
  return `Хештег не может быть длиннее ${maxLength + 1} символов`;
};

const getFirstCharErrorString = (currentString) => {
  const firstChar = currentString[0];
  if (firstChar !== '#' && currentString.length === 1) {
    return 'Хэштег должен начинаться с символа #';
  }
  return '';
};

const getDuplicateHashtagsErrorString = (hashtagsToCheck) => {
  const hashtag = checkArrayForDuplicate(hashtagsToCheck);
  if (hashtag) {
    return `Хештег #${hashtag} уже существует`;
  }
  return '';
};

const resetHashtagsCharCounter = () => {
  hashtagsCharCounter = undefined;
};


const checkHastagsIn = (input) => {
  const currentString = input.value;

  let isInputError = false;
  let messageToShow = '';

  const currentHashtags = createCurrentHashtagsFrom(currentString);

  const expressionCheckResult = checkStringsForExpression(currentHashtags, HASHTAG_EXPRESSION);
  const expressionErrorString = getExpressionErrorString(expressionCheckResult, MAX_HASHTAG_LENGTH);

  const countErrorString = getHashtagCountErrorString(currentHashtags, currentString);
  const firstCharErrorString = getFirstCharErrorString(currentString);
  const duplicateHashtagsErrorString = getDuplicateHashtagsErrorString(currentHashtags);

  for (const errorString of [expressionErrorString, firstCharErrorString, duplicateHashtagsErrorString, countErrorString]) {
    if (errorString) {
      isInputError = true;
      messageToShow = checkInputValue(input, currentString, errorString, isInputError);
    }
  }

  if (!isInputError) {
    messageToShow = checkInputValue(input, currentString, messageToShow, isInputError);
  }

  input.setCustomValidity(messageToShow);
  input.reportValidity();
  hashtagsCharCounter = input.value.length;
};

export {checkHastagsIn, resetHashtagsCharCounter};
