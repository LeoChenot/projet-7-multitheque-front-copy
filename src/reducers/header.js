import { CHANGE_INPUT_VALUE_HEADER } from "../actions/header";

const initialState = {
  searchBar: '',
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE_HEADER: {
      return {
        ...state,
        [action.stateName]: action.value,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer;