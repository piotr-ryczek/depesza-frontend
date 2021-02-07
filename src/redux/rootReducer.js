import { combineReducers } from 'redux';

import { authReducer, notificationsReducer } from './reducers';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  auth: authReducer,
});

export default rootReducer;
