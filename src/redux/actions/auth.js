const prefix = 'AUTH';

export const LOGIN = `${prefix}_LOGIN`;
export const LOGOUT = `${prefix}_LOGOUT`;

export const login = (token, hasPassword) => ({
  type: LOGIN,
  payload: {
    token,
    hasPassword,
  },
});

export const logout = () => ({
  type: LOGOUT,
});
