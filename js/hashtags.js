import {checkArrayForDuplicate, checkStringForExpression, getLastElementIn} from './utils.js';
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
  tags.forEach((tag) => {
    if (!checkStringForExpression(tag, HASHTAG_EXPRESSION)) {
      if (tag.length < MAX_HASHTAG_LENGTH) {
        for (let charIterator = 0; charIterator < tag.length; charIterator++ ) {
          const char = tag[charIterator];
          if (!HASHTAG_EXPRESSION.test(char)) {
            errorMessage = `Хештег "${tag}" содержит недопустимый символ '${char}'`;
          }
        }
      }
      if (tag.length >= MAX_HASHTAG_LENGTH) {
        errorMessage =  `Хештег "${tag}" слишком длинный. Хештег не может содержать больше ${MAX_HASHTAG_LENGTH} символов`;
      }
    }
  });
  return errorMessage;
};

const getDuplicateTagsErrorString = (tags) => {
  const tag = checkArrayForDuplicate(tags);
  if (tag) {
    return `Хештег #${tag} уже существует`;
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
      editingState = 'error';
      errorMessage = errorString;
    }
  }

  switch (editingState) {
    case 'refreshing':
    case 'error':
      input.value = createInputValueFrom(tags);
      break;
    default:
      if (getLastElementIn(rawTags) === '') {
        tags.push('');
      }
      input.value = createInputValueFrom(tags);
  }

  input.setCustomValidity(errorMessage);
  input.reportValidity();

  hashtagsCharCounter = input.value.length;
};

export {checkHastagsIn, resetHashtagsCharCounter};
