import { CHANGE_INPUT_VALUE_REGISTER, SET_FETCH_REGISTER_RESPONSE_CODE } from "../actions/register";

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  bYear: '',
  bMonth: '',
  bDay: '',
  email: '',
  password1: '',
  password2: '',

  fetchRegisterResponseCode: undefined,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE_REGISTER: {
      return {
        ...state,
        [action.stateName]: action.value,
      }
    }
    case SET_FETCH_REGISTER_RESPONSE_CODE: {
      return {
        ...state,
        fetchRegisterResponseCode: action.newFetchRegisterResponseCode
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;