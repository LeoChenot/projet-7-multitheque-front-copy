import { TOGGLE_MAIN_MENU } from "../actions/mainMenu";

const initialState = {
  isOpen: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_MAIN_MENU: {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;