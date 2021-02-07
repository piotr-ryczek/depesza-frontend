import React from 'react';
import { useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';

import { useNotificationsStyles } from './styles';
import { NotificationInList } from './notification';

export const Notifications = () => {
  const notifications = useSelector(state => state.notifications.notifications);
  const classes = useNotificationsStyles();

  if (!notifications.length) return null;

  return (
    <div className={classes.wrapper}>
      <Paper>
        {notifications.map(notification => (
          <NotificationInList key={notification.id} notification={notification} />
        ))}
      </Paper>
    </div>
  );
};
