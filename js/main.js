const getRandomNumberFrom = (minValue, maxValue) => {
  if (minValue < 0 || (maxValue <= minValue)) {
    return 'Введите корректные значения диапозона';
  }
  // Принцип рандома взят отсюда https://www.w3schools.com/js/js_random.asp
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('Hello world', 140);

const descriptionWords = {
  properties: ['Огромная', 'Красивая', 'Грустная', 'Забавная', 'Скользкая', 'Пушистая', 'Яркая', 'Зелёная', 'Жизнерадостная'],
  nouns: ['дверь', 'собачка', 'птица', 'скатерть', 'радость', 'зажигалка', 'грусть', 'балалайка', 'кошка', 'берёзка'],
  backgroundObjects: ['заката', 'дороги', 'леса', 'безысходности', 'гор', 'лужайки', 'озера'],
};

let textForComments = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

const namesForComments = ['Иван', 'Татьяна', 'Виктор', 'Александра', 'Алексей','Виталий','Григорий', 'Елена','Светлана','Людмила','Сергей','Пётр','Николай','Виктория','Наталья','Максим', 'Галина','Роман','Мария'];

textForComments = textForComments.replace(/\. |! /g, (substring) => {
  switch (substring) {
    case '. ':
      return '.#';
    case '! ':
      return '!#';
    default:
      return substring;
  }
});

const sentences = textForComments.split('#');

let usedCommentsIds = [];

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

const getComments = (numberOfComments) => {
  const comments = [];

  for (let iterator = 1; iterator <= numberOfComments; iterator++) {

    const id = getUniqueId(1, 1000, usedCommentsIds);

    const avatarNumber = getRandomNumberFrom(1, 6);
    const avatar = `img/avatar-${avatarNumber}.svg`;

    const numberOfSentences = getRandomNumberFrom(1, 2);
    let message = '';
    for (let it = 1; it <= numberOfSentences; it++) {
      const sentenceIndex = getRandomNumberFrom(0, sentences.length - 1);
      const sentence = sentences[sentenceIndex];
      message += (it === 2) ? ` ${sentence}` : `${sentence}`;
    }

    const nameIndex = getRandomNumberFrom(0, namesForComments.length - 1);
    const name = namesForComments[nameIndex];

    const comment = {
      id: id,
      avatar: avatar,
      message: message,
      name: name,
    };
    comments.push(comment);
  }

  return comments;
};

const getPosts = (numberOfPosts) => {
  const posts = [];
  const usedIds = [];
  const usedUrlIds = [];

  for (let iterator = 1; iterator <= numberOfPosts; iterator++) {
    const id = getUniqueId(1, numberOfPosts, usedIds);

    const urlId = getUniqueId(1, numberOfPosts, usedUrlIds);
    const url = `photos/${urlId}.jpg`;

    const nounIndex = getRandomNumberFrom(0, descriptionWords.nouns.length - 1);
    const noun = descriptionWords.nouns[nounIndex];
    const propertyIndex = getRandomNumberFrom(0, descriptionWords.properties.length - 1);
    const property = descriptionWords.properties[propertyIndex];
    const backgroundIndex = getRandomNumberFrom(0, descriptionWords.backgroundObjects.length - 1);
    const background = descriptionWords.backgroundObjects[backgroundIndex];
    const description = `${property} ${noun} на фоне ${background}`;

    const likes = getRandomNumberFrom(15, 200);

    const numberOfComments = getRandomNumberFrom(1, 6);
    const comments = getComments(numberOfComments);

    const post = {
      id: id,
      url: url,
      description: description,
      likes: likes,
      comments: comments,
    };

    posts.push(post);
  }

  usedCommentsIds = [];
  return posts;
};

getPosts(25);
