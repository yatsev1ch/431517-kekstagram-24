import {getPosts} from './data.js';
import {generateThumbnailsFrom} from './thumbnails.js';

const posts = getPosts(25);
generateThumbnailsFrom(posts);
