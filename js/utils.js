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

export {getRandomNumberFrom, checkStringLength, getRandomElementFrom, getUniqueId, createMessageFrom};
