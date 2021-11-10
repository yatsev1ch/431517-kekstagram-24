const performHTTPRequest = (url, successCb, errorCb, requestMethod = 'GET', requestSettings) => {
  let settings = {method: requestMethod};
  if (requestSettings) {
    settings = {...settings, ...requestSettings};
  }
  fetch(url, settings).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  }).then((data) => {
    if (requestMethod === 'GET') {
      successCb(data);
      return;
    }
    successCb();
  }).catch(() => {
    errorCb();
  });
};

export {performHTTPRequest};
