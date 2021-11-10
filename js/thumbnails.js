import {showPost} from './post.js';
import {performHTTPRequest} from './network.js';
import {showNotification} from './notifications.js';
import {getRandomElementsFrom, createDebouncer} from './utils.js';

const POSTS_URL = 'https://24.javascript.pages.academy/kekstagram/data';
const DEBOUNCE_DELAY = 500;

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailsFilters = document.querySelector('.img-filters');
const thumbnailsFiltersButtons = thumbnailsFilters.querySelectorAll('.img-filters__button');

let posts;
let debounceFilterChange;

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

const removeCurrentThumbnails = () => {
  const currentThumbnails = thumbnailsContainer.querySelectorAll('.picture');
  currentThumbnails.forEach((currentThumbnail) => {
    currentThumbnail.remove();
  });
};

const renderThumbnailsFrom = (postsToRender) => {
  removeCurrentThumbnails();
  const fragment = document.createDocumentFragment();
  postsToRender.forEach((post) => {
    const thumbnail = createThumbnailFrom(post);
    fragment.append(thumbnail);
  });
  thumbnailsContainer.append(fragment);
};

const setFiltersButtonToActive = (buttonId) => {
  thumbnailsFiltersButtons.forEach((button) => {
    button.id === buttonId ? button.classList.add('img-filters__button--active') :  button.classList.remove('img-filters__button--active');
  });
};

const renderRandomPostsThumbnails = (numberOfPosts) => {
  const randomPosts = getRandomElementsFrom(posts, numberOfPosts);
  renderThumbnailsFrom(randomPosts);
};

const renderDiscussedPostsThumbnails = () => {
  const postsToSort = posts.slice();
  postsToSort.sort((firstPost, secondPost) => {
    if (firstPost.comments.length < secondPost.comments.length) {
      return 1;
    }
    if (firstPost.comments.length > secondPost.comments.length) {
      return -1;
    }
    return 0;
  });
  renderThumbnailsFrom(postsToSort);
};

const changeThumbnailsFilterWith = (filterButtonId) => {
  switch (filterButtonId) {
    case 'filter-default':
      renderThumbnailsFrom(posts);
      break;
    case 'filter-random':
      renderRandomPostsThumbnails(10);
      break;
    case 'filter-discussed':
      renderDiscussedPostsThumbnails();
  }
};

thumbnailsFilters.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const buttonId = evt.target.id;
    debounceFilterChange(buttonId);
    setFiltersButtonToActive(buttonId);
  }
});

const getPosts = () => {
  performHTTPRequest(POSTS_URL, (fetchedPosts) => {
    posts = fetchedPosts;
    renderThumbnailsFrom(posts);
    debounceFilterChange = createDebouncer((filterButtonId) => {
      changeThumbnailsFilterWith(filterButtonId);
    }, DEBOUNCE_DELAY);
    thumbnailsFilters.classList.remove('img-filters--inactive');
  }, () => {
    showNotification('load-error');
  });
};

export {getPosts};
