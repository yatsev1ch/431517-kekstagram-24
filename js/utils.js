const getRandomNumberFrom = (minValue, maxValue) => {
  if (minValue < 0 || (maxValue <= minValue)) {
    return 'Введите корректные значения диапозона';
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomElementFrom = (array) => {
  const index = getRandomNumberFrom(0, array.length - 1);
  return array[index];
};

const checkForActiveElementsIn = (elements) => {
  for (const element of elements) {
    if (document.activeElement === element) {
      return true;
    }
  }
  return false;
};

const checkArrayForDuplicate = (array) => {
  for (let globalIterator = 0; globalIterator <= array.length - 2; globalIterator++) {
    for (let innerIterator = globalIterator + 1; innerIterator <= array.length - 1; innerIterator++){
      if (array[globalIterator] === array[innerIterator]){
        const element = array[innerIterator];
        return element;
      }
    }
  }
  return false;
};

const isEscape = (evt) => evt.key === 'esc' || evt.key === 'Escape';


const getUniqueId = (minValue, maxValue, usedIds) => {
  let id = getRandomNumberFrom(minValue, maxValue);
  if (usedIds.length !== 0) {
    while (usedIds.includes(id)) {
      id = getRandomNumberFrom(minValue, maxValue);
    }
  }
  usedIds.push(id);
  return id;
};

const createMessageFrom = (arrayOfStrings, numberOfStrings) => {
  const usedStrings = [];
  for (let iterator = 1; iterator <= numberOfStrings; iterator++) {
    const string = getRandomElementFrom(arrayOfStrings);
    usedStrings.push(string);
  }

  return usedStrings.join(' ');
};

const resetRadioButtonsTo = (value, radioButtons) => {
  radioButtons.forEach((button) => {
    button.checked = button.value === value;
  });
};

export {getRandomNumberFrom, checkStringLength, getRandomElementFrom, getUniqueId, createMessageFrom, isEscape, checkArrayForDuplicate, checkForActiveElementsIn, resetRadioButtonsTo};

