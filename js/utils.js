const getRandomNumberFrom = (minValue, maxValue) => {
  if (minValue < 0 || (maxValue <= minValue)) {
    return 'Введите корректные значения диапозона';
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
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

const resetRadioButtonsTo = (value, radioButtons) => {
  radioButtons.forEach((button) => {
    button.checked = button.value === value;
  });
};

const getRandomElementsFrom = (array, numberOfElements) => {
  const randomElements = [];
  let index = getRandomNumberFrom(0, array.length - 1);
  randomElements.push(array[index]);
  while (randomElements.length < numberOfElements) {
    if (randomElements.includes(array[index])) {
      index = getRandomNumberFrom(0, array.length - 1);
      continue;
    }
    randomElements.push(array[index]);
  }
  return randomElements;
};

const createDebouncer = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {isEscape, checkArrayForDuplicate, checkForActiveElementsIn, resetRadioButtonsTo, getRandomElementsFrom, createDebouncer};
