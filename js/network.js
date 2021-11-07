const requestPosts = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
.then((response) => response.json()).then((data) => {
  generateThumbnailsFrom(data);
});
}
