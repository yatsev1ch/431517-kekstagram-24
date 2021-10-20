const postContainer = document.querySelector('.big-picture');
const image = postContainer.querySelector('img');
const likes = postContainer.querySelector('.likes-count');
const comments = postContainer.querySelector('.comments-count');
const closeButton = postContainer.querySelector('.big-picture__cancel');
const counter = postContainer.querySelector('.social__comment-count');
const commentsLoader = postContainer.querySelector('.comments-loader');
const commentsContainer = postContainer.querySelector('.social__comments');
const description = postContainer.querySelector('.social__caption');

const showModal = () => {
  postContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  postContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const createCommentElementFrom = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialPicture.width = 35;
  socialPicture.height = 35;
  commentElement.append(socialPicture);

  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = comment.message;
  commentElement.append(socialText);

  return commentElement;
};

const showPost = (post) => {
  counter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  description.textContent = post.description;
  image.src = post.url;
  likes.textContent = post.likes;
  comments.textContent = post.comments.length;

  const fragment = document.createDocumentFragment();
  post.comments.forEach((comment) => {
    const commentElement = createCommentElementFrom(comment);
    fragment.append(commentElement);
  });

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  showModal();

  closeButton.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'esc' || evt.key === 'Escape') {
      closeModal();
    }
  });
};

export {showPost};
