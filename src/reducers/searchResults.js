import {
  SAVE_FOUND_MOVIES_RESULT,
  SAVE_FOUND_SERIES_RESULT,
  SAVE_FOUND_BOOKS_RESULT,
  SAVE_FOUND_VIDEO_GAMES_RESULT,

  SET_FOUND_MOVIES_LOADING,
  SET_FOUND_SERIES_LOADING,
  SET_FOUND_BOOKS_LOADING,
  SET_FOUND_VIDEO_GAMES_LOADING,
} from "../actions/searchResults"

const initialState = {
  foundMoviesLoading: true,
  foundSeriesLoading: true,
  foundBooksLoading: true,
  foundVideoGamesLoading: true,
  
  foundMoviesResult: undefined,
  foundSeriesResult: undefined,
  foundBooksResult: undefined,
  foundVideoGamesResult: undefined,
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_FOUND_MOVIES_RESULT: {
      return {
        ...state,
        foundMoviesResult: action.newFoundMoviesResult,
      }
    }
    case SAVE_FOUND_SERIES_RESULT: {
      return {
        ...state,
        foundSeriesResult: action.newFoundSeriesResult,
      }
    }
    case SAVE_FOUND_BOOKS_RESULT: {
      return {
        ...state,
        foundBooksResult: action.newFoundBooksResult,
      }
    }
    case SAVE_FOUND_VIDEO_GAMES_RESULT: {
      return {
        ...state,
        foundVideoGamesResult: action.newFoundVideoGamesResult,
      }
    }
    // ------------------------------
    case SET_FOUND_MOVIES_LOADING: {
      return {
        ...state,
        foundMoviesLoading: action.newFoundMoviesLoading,
      }
    }
    case SET_FOUND_SERIES_LOADING: {
      return {
        ...state,
        foundSeriesLoading: action.newFoundSeriesLoading,
      }
    }
    case SET_FOUND_BOOKS_LOADING: {
      return {
        ...state,
        foundBooksLoading: action.newFoundBooksLoading,
      }
    }
    case SET_FOUND_VIDEO_GAMES_LOADING: {
      return {
        ...state,
        foundVideoGamesLoading: action.newFoundVideoGamesLoading,
      }
    }
    // ------------------------------
    default: {
      return state;
    }
  }
}

export default reducer