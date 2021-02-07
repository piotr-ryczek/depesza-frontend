import React from 'react';
import { useDispatch } from 'react-redux';

import Alert from '@material-ui/lab/Alert';

import { removeNotification } from 'redux/actions';

import { translateCode, getSeverity } from './helpers';

export const NotificationInList = props => {
  const {
    notification: { id, code, message, type },
  } = props;

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeNotification(id));
  };

  return (
    <Alert severity={getSeverity(type)} onClose={handleRemove}>
      {translateCode(code, message)}
    </Alert>
  );
};
