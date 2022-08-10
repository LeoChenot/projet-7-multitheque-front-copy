export const CHANGE_INPUT_VALUE_REGISTER = 'CHANGE_INPUT_VALUE_REGISTER';

export const changeInputValueRegister = (stateName, value) => ({
  type: CHANGE_INPUT_VALUE_REGISTER,
  stateName,
  value,
});


export const SET_FETCH_REGISTER_RESPONSE_CODE = 'SET_FETCH_REGISTER_RESPONSE_CODE';
export const setFetchRegisterResponseCode = (newFetchRegisterResponseCode) => ({
  type: SET_FETCH_REGISTER_RESPONSE_CODE,
  newFetchRegisterResponseCode,
});
