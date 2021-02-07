import update from 'immutability-helper';
import { LOGIN, LOGOUT } from 'redux/actions';

export const authInitialState = {
  token: '',
  hasPassword: false,
};

export function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { token, hasPassword } = action.payload;

      return update(state, {
        token: { $set: token },
        hasPassword: { $set: hasPassword },
      });
    }

    case LOGOUT:
      return update(state, {
        token: { $set: '' },
        hasPassword: { $set: false },
      });
    default:
      return state;
  }
}
