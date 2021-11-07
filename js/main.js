import {getPosts} from './data.js';
import {generateThumbnailsFrom} from './thumbnails.js';
import './new-post.js';

// const posts = getPosts(25);
// generateThumbnailsFrom(posts);

fetch('https://24.javascript.pages.academy/kekstagram/data')
.then((response) => response.json()).then((data) => {
  generateThumbnailsFrom(data);
});
