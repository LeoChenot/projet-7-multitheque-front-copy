export const CHANGE_INPUT_VALUE_LOGIN = 'CHANGE_INPUT_VALUE_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const changeInputValueLogin = (stateName, value) => ({
  type: CHANGE_INPUT_VALUE_LOGIN,
  stateName,
  value,
});

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});
