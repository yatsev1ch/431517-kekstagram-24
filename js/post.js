import {setupAndShowModal} from './modal.js';

const postContainer = document.querySelector('.big-picture');
const postImage = postContainer.querySelector('img');
const postLikes = postContainer.querySelector('.likes-count');
const postComments = postContainer.querySelector('.comments-count');
const closeButton = postContainer.querySelector('.big-picture__cancel');
const counter = postContainer.querySelector('.social__comment-count');
const commentsLoader = postContainer.querySelector('.comments-loader');
const commentsContainer = postContainer.querySelector('.social__comments');
const postDescription = postContainer.querySelector('.social__caption');

const createCommentElementFrom = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialPicture.width = 35;
  socialPicture.height = 35;
  commentElement.append(socialPicture);

  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = message;
  commentElement.append(socialText);

  return commentElement;
};

const showPost = ({description, url, likes, comments}) => {
  counter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  postDescription.textContent = description;
  postImage.src = url;
  postLikes.textContent = likes;
  postComments.textContent = comments.length;

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createCommentElementFrom(comment);
    fragment.append(commentElement);
  });

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  setupAndShowModal(postContainer, closeButton);
};

export {showPost};
