import {setupAndShowModal} from './modal.js';

const MAX_NEW_COMMENTS_COUNT = 5;

const container = document.querySelector('.big-picture');
const closeButton = container.querySelector('.big-picture__cancel');
const image = container.querySelector('img');
const caption = container.querySelector('.social__caption');
const likesCount = container.querySelector('.likes-count');
const commentsContainer = container.querySelector('.social__comments');
const commentsCount = container.querySelector('.comments-count');
const loadedCommentsCount = container.querySelector('.loaded-comments-count');
const commentsLoadButton = container.querySelector('.comments-loader');
let postComments;


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

const loadNewComments = (comments) => {
  const numberOfComments = comments.length;
  let numberOfExistingComments = commentsContainer.childElementCount;

  const numberOfNewComments = Math.min(numberOfComments - numberOfExistingComments, MAX_NEW_COMMENTS_COUNT);

  const fragment = document.createDocumentFragment();
  for (let iterator = numberOfExistingComments; iterator < numberOfExistingComments + numberOfNewComments; iterator++) {
    const comment = comments[iterator];
    const commentElement = createCommentElementFrom(comment);
    fragment.append(commentElement);
  }
  commentsContainer.append(fragment);

  numberOfExistingComments = commentsContainer.childElementCount;

  loadedCommentsCount.textContent = numberOfExistingComments;
  if (numberOfExistingComments === numberOfComments) {
    commentsLoadButton.classList.add('hidden');
  }
};

const onLoadCommentsClick = () => {
  loadNewComments(postComments);
};

const onPostClose = () => {
  commentsLoadButton.removeEventListener('click', onLoadCommentsClick);
  commentsLoadButton.classList.remove('hidden');
  postComments = undefined;
};

const showPost = ({description, url, likes, comments}) => {
  postComments = comments;
  caption.textContent = description;
  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  commentsContainer.innerHTML = '';

  loadNewComments(postComments);
  commentsLoadButton.addEventListener('click', onLoadCommentsClick);

  setupAndShowModal(container, closeButton, onPostClose);
};

export {showPost};
