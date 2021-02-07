import { authInitialState, notificationsInitialState } from './reducers';

export const appInitialState = {
  notifications: notificationsInitialState,
  auth: authInitialState,
};
