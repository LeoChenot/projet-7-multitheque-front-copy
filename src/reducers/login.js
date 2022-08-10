import { CHANGE_INPUT_VALUE_LOGIN } from "../actions/login";

const initialState = {
  email: '',
  password: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE_LOGIN: {
      return {
        ...state,
        [action.stateName]: action.value,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;