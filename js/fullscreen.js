const showPost = (post) => {
  const bigPicture = document.querySelector('.big-picture');
  const image = document.querySelector('.big-picture__img img');
  const likes = document.querySelector('.likes-count');
  const comments = document.querySelector('.comments-count');


  bigPicture.classList.remove('hidden');
  image.src = post.url;
  likes.textContent = post.likes;
  comments.textContent = post.comments.length;

};

export {showPost};
