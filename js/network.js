const performHTTPRequest = (url, successCb, errorCb, requestMethod = 'GET', requestSettings) => {
  const settings = {method: requestMethod, ...requestSettings};

  fetch(url, settings).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  }).then((data) => {
    successCb(data);
  }).catch(() => {
    errorCb();
  });
};

export {performHTTPRequest};
