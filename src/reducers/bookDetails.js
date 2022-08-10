import { SAVE_BOOK_DETAILS_RESULT, SET_BOOK_DETAILS_LOADING } from "../actions/bookDetails";

const initialState = {
  bookDetailsLoading: true,
  bookDetailsResult: undefined,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_BOOK_DETAILS_RESULT: {
      return {
        ...state,
        bookDetailsResult: action.newBookDetailsResult,
      }
    }
    case SET_BOOK_DETAILS_LOADING: {
      return {
        ...state,
        bookDetailsLoading: action.newBookDetailsLoading,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;