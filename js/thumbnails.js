import {showPost} from './post.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');

thumbnailsContainer.addEventListener('click', (evt) => {
  const targetThumbnail = evt.target.closest('.picture');
  if (targetThumbnail) {
    evt.preventDefault();
    showPost(targetThumbnail.post);
  }
});


const createThumbnailFrom = (post) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailPicture = thumbnail.querySelector('img');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');

  thumbnail['post'] = post;
  thumbnailPicture.src = post.url;
  thumbnailLikes.textContent = post.likes;
  thumbnailComments.textContent = post.comments.length;

  return thumbnail;
};

const generateThumbnailsFrom = (posts) => {
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const thumbnail = createThumbnailFrom(post);
    fragment.append(thumbnail);
  });
  thumbnailsContainer.append(fragment);
};

export {generateThumbnailsFrom};
