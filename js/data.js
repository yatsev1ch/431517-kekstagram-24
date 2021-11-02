import {getRandomNumberFrom, getRandomElementFrom, getUniqueId, createMessageFrom} from './utils.js';

const descriptionWords = {
  properties: ['Огромная', 'Красивая', 'Грустная', 'Забавная', 'Скользкая', 'Пушистая', 'Яркая', 'Зелёная', 'Жизнерадостная'],
  nouns: ['дверь', 'собачка', 'птица', 'скатерть', 'радость', 'зажигалка', 'грусть', 'балалайка', 'кошка', 'берёзка'],
  backgroundObjects: ['заката', 'дороги', 'леса', 'безысходности', 'гор', 'лужайки', 'озера'],
};

const sentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const namesForComments = ['Иван', 'Татьяна', 'Виктор', 'Александра', 'Алексей','Виталий','Григорий', 'Елена','Светлана','Людмила','Сергей','Пётр','Николай','Виктория','Наталья','Максим', 'Галина','Роман','Мария'];


let usedCommentsIds = [];

const getComments = (numberOfComments) => {
  const comments = [];

  for (let iterator = 1; iterator <= numberOfComments; iterator++) {

    const id = getUniqueId(1, 1000, usedCommentsIds);

    const avatarNumber = getRandomNumberFrom(1, 6);
    const avatar = `img/avatar-${avatarNumber}.svg`;

    const numberOfSentences = getRandomNumberFrom(1, 2);
    const message = createMessageFrom(sentences, numberOfSentences);

    const name = getRandomElementFrom(namesForComments);

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


    const noun = getRandomElementFrom(descriptionWords.nouns);
    const property = getRandomElementFrom(descriptionWords.properties);
    const background = getRandomElementFrom(descriptionWords.backgroundObjects);
    const description = `${property} ${noun} на фоне ${background}`;

    const likes = getRandomNumberFrom(15, 200);

    const numberOfComments = getRandomNumberFrom(4, 15);
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


export {getPosts};
