import { v4 as uuidv4 } from 'uuid';

import config from 'lib/config';
import { logout } from './auth';

const prefix = 'NOTIFICATIONS';

export const ADD_NOTIFICATION = `${prefix}_ADD_NOTIFICATION`;
export const REMOVE_NOTIFICATION = `${prefix}_REMOVE_NOTIFICATION`;

export const removeNotification = notificationId => ({
  type: REMOVE_NOTIFICATION,
  payload: notificationId,
});

export const addNotification = ({ id = uuidv4(), type, code, message }) => dispatch => {
  setTimeout(() => {
    dispatch(removeNotification(id));
  }, config.notificationsTimeout);

  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      id,
      code,
      type,
      message,
    },
  });
};

export const handleApiError = error => dispatch => {
  if (!error.response) {
    dispatch(addError({ message: 'Bład przy połączeniu.' }));
    return;
  }

  const { data, status } = error.response;

  const { errorCode } = data;

  // Should logout
  if (status === 403 && !errorCode) {
    dispatch(logout());
    dispatch(addError({ message: 'Nieautoryzowany dostęp. Zostałeś wylogowany.' }));

    return;
  }

  if (status === 403 && errorCode === 'PUBLISHER_ALREADY_HAS_PASSWORD') {
    dispatch(logout());
    dispatch(addError({ message: 'Zostałeś wylogowany.' }));

    return;
  }

  dispatch(addError({ code: errorCode }));
};

export const addError = ({ code, message }) => dispatch => {
  const errorId = uuidv4();

  const error = {
    id: errorId,
    code,
    message,
    type: 'error',
  };

  setTimeout(() => {
    dispatch(removeNotification(errorId));
  }, config.notificationsTimeout);

  dispatch({
    type: ADD_NOTIFICATION,
    payload: error,
  });
};
