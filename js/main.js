function getRandomNumberFrom(minValue, maxValue) {
  if (minValue < 0 || (maxValue <= minValue)) {
    return 'Введите корректные значения диапозона';
  }
  // Принцип рандома взят отсюда https://www.w3schools.com/js/js_random.asp
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

getRandomNumberFrom(5, 10);

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('Hello world', 140);
