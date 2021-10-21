import {showPost} from './fullscreen.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnailFrom = (post) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const picture = thumbnail.querySelector('img');
  const likes = thumbnail.querySelector('.picture__likes');
  const comments = thumbnail.querySelector('.picture__comments');

  picture.src = post.url;
  likes.textContent = post.likes;
  comments.textContent = post.comments.length;

  return thumbnail;
};

const generateThumbnailsFrom = (posts) => {
  const fragment = document.createDocumentFragment();
  const thumbnailsContainer = document.querySelector('.pictures');
  posts.forEach((post) => {
    const thumbnail = createThumbnailFrom(post);
    thumbnail.addEventListener('click', (evt) =>{
      evt.preventDefault();
      showPost(post);
    });
    fragment.append(thumbnail);
  });
  thumbnailsContainer.append(fragment);
};

export {generateThumbnailsFrom};
