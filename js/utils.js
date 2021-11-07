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

export {isEscape, checkArrayForDuplicate, checkForActiveElementsIn, resetRadioButtonsTo};

