import update from 'immutability-helper';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'redux/actions/notifications';

export const notificationsInitialState = {
  notifications: [],
};

export function notificationsReducer(state = notificationsInitialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const { id, code, type, message } = action.payload;

      const newNotification = {
        id,
        code,
        type,
        message,
      };

      return update(state, {
        notifications: { $push: [newNotification] },
      });
    }

    case REMOVE_NOTIFICATION: {
      const { notifications } = state;
      const notificationId = action.payload;
      const newNotificationsList = notifications.filter(({ id }) => id !== notificationId);

      return update(state, {
        notifications: { $set: newNotificationsList },
      });
    }

    default:
      return state;
  }
}
