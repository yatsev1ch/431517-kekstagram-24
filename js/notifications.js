import {checkIfEscape} from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const loadErrorTemplate = document.querySelector('#load-error').content.querySelector('.load-error');

let notificationContainer;

const onNotificationEscape = (evt) => {
  if (checkIfEscape(evt)) {
    evt.preventDefault();
    notificationContainer.remove();
    notificationContainer = undefined;
    document.removeEventListener('keydown', onNotificationEscape);
  }
};

const showNotification = (typeName) => {
  switch (typeName) {
    case 'success':
      notificationContainer = successTemplate.cloneNode(true);
      break;
    case 'error':
      notificationContainer = errorTemplate.cloneNode(true);
      break;
    case 'load-error':
      notificationContainer = loadErrorTemplate.cloneNode(true);
      break;
  }

  const closeButton = notificationContainer.querySelector('.notification-button');

  notificationContainer.addEventListener('click', (evt) => {
    if (evt.target === notificationContainer || evt.target === closeButton) {
      notificationContainer.remove();
      notificationContainer = undefined;
      document.removeEventListener('keydown', onNotificationEscape);
    }
  });

  document.addEventListener('keydown', onNotificationEscape);

  document.body.append(notificationContainer);
};

export {showNotification};
