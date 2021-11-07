import {fetchPosts} from './network.js';
import {generateThumbnailsFrom} from './thumbnails.js';
import {showNotification} from './notifications.js';
import './new-post.js';

fetchPosts(generateThumbnailsFrom, showNotification);
