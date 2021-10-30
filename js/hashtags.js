import {checkArrayForDuplicate, checkStringForExpression} from './utils.js';
import {MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH, HASHTAG_EXPRESSION} from './new-post.js';

let hashtagsCharCounter = 0;

const createTagsFrom = (input, editingState) => {
  const inputString = input.value;
  const lastChar = inputString.slice(-1);
  const twoLastChars = inputString.slice(-2);

  let typingErrorString;

  let stringToSplit = inputString.toLowerCase().replace(/\s/g, '');

  switch (true) {
    case editingState === 'refreshing' && (lastChar === '#' || lastChar === ' '):
      stringToSplit = stringToSplit.slice(0, -1).trim();
      break;
    case editingState === 'typing' && inputString.length === 1 && lastChar !== '#':
      typingErrorString = 'Хештег должен начинаться с #';
      break;
    case editingState === 'typing' && twoLastChars === '# ':
      typingErrorString = 'Хештег не может содержать пробел';
      break;
    case editingState === 'typing' && lastChar === ' ':
      stringToSplit += '#';
      break;
    case editingState === 'typing' && twoLastChars === '##':
      stringToSplit = stringToSplit.slice(0, -1);
      typingErrorString = 'Хештег не может содержать #';
      break;
  }
  const rawTags = stringToSplit.split('#');
  rawTags.shift();

  const tags = rawTags.filter((tag) => tag !== '');

  return {tags, rawTags, typingErrorString};
};

const getTagsCountErrorString = (rawTags, tags) => {
  if (rawTags.length > MAX_HASHTAG_COUNT && tags.length === MAX_HASHTAG_COUNT) {
    return `Максимальное количество хештегов - ${MAX_HASHTAG_COUNT}`;
  }
  return '';
};

const getExpressionErrorString = (tags) => {
  let errorMessage = '';
  tags.forEach((tag, tagIndex) => {
    if (!checkStringForExpression(tag, HASHTAG_EXPRESSION)) {
      if (tag.length >= MAX_HASHTAG_LENGTH) {
        tags[tagIndex] = tag.slice(0, MAX_HASHTAG_LENGTH - 1);
        errorMessage =  `Хештег не может содержать больше ${MAX_HASHTAG_LENGTH} символов`;
      }
      if (tag.length < MAX_HASHTAG_LENGTH) {
        const lastChar = tag.slice(-1);
        tags[tagIndex] = tag.slice(0, -1);
        errorMessage = `Хештег не может содержать символ '${lastChar}'`;
      }
    }
  });
  return errorMessage;
};

const getDuplicateTagsErrorString = (tags) => {
  const {element, innerIterator} = checkArrayForDuplicate(tags);
  if (element) {
    tags[innerIterator] = element.slice(0, -1);
    return `Хештег #${element} уже существует`;
  }
  return '';
};

const resetHashtagsCharCounter = () => {
  hashtagsCharCounter = 0;
};

const createInputValueFrom = (tags) => {
  const hashtags = tags.map((tag) => `#${tag}`);
  const valueString = hashtags.join(' ');
  return valueString;
};


const checkHastagsIn = (input) => {
  const inputString = input.value;

  let errorMessage = '';
  let isInputError  = false;


  let editingState;
  switch (true) {
    case inputString.length > hashtagsCharCounter:
      editingState = 'typing';
      break;
    case inputString.length === hashtagsCharCounter:
      editingState = 'refreshing';
      break;
  }


  const {tags, rawTags, typingErrorString} = createTagsFrom(input, editingState);

  const countErrorString = getTagsCountErrorString(rawTags, tags);
  const expressionErrorString = getExpressionErrorString(tags);
  const duplicateErrorString = getDuplicateTagsErrorString(tags);

  if (typingErrorString) {
    errorMessage = typingErrorString;
  }

  for (const errorString of [expressionErrorString, countErrorString, duplicateErrorString]) {
    if (errorString) {
      isInputError = true;
      errorMessage = errorString;
    }
  }

  input.value = isInputError ? createInputValueFrom(tags) : createInputValueFrom(rawTags);

  input.setCustomValidity(errorMessage);
  input.reportValidity();

  hashtagsCharCounter = input.value.length;
};

export {checkHastagsIn, resetHashtagsCharCounter};
