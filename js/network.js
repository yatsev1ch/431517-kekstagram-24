const loadNewPost = (formData, successHandler, errorHandler) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      successHandler('success');
      return;
    }
    throw new Error();
  }).catch(() => {
    errorHandler('error');
  });
};


const fetchPosts = (successHandler, errorHandler) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  }).then((posts) => {
    successHandler(posts);
  }).catch(() => {
    errorHandler('load-error');
  });
};

export {fetchPosts, loadNewPost};
