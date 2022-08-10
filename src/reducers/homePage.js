import {
  SAVE_LATEST_MOVIES_RELEASE_RESULT,
  SAVE_LATEST_SERIES_RELEASE_RESULT,
  SAVE_LATEST_BOOKS_RELEASE_RESULT,
  SAVE_LATEST_VIDEO_GAMES_RELEASE_RESULT,

  SET_LATEST_MOVIES_RELEASE_LOADING,
  SET_LATEST_SERIES_RELEASE_LOADING,
  SET_LATEST_BOOKS_RELEASE_LOADING,
  SET_LATEST_VIDEO_GAMES_RELEASE_LOADING,
} from "../actions/homePage";

const initialState = {
  latestMoviesReleaseLoading: true,
  latestSeriesReleaseLoading: true,
  latestBooksReleaseLoading: true,
  latestVideoGamesReleaseLoading: true,

  latestMoviesReleaseResult: undefined,
  latestSeriesReleaseResult: undefined,
  latestBooksReleaseResult: undefined,
  latestVideoGamesReleaseResult: undefined,
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_LATEST_MOVIES_RELEASE_RESULT: {
      return {
        ...state,
        latestMoviesReleaseResult: action.newLatestMoviesReleaseResult,
      }
    }
    case SAVE_LATEST_SERIES_RELEASE_RESULT: {
      return {
        ...state,
        latestSeriesReleaseResult: action.newLatestSeriesReleaseResult,
      }
    }
    case SAVE_LATEST_BOOKS_RELEASE_RESULT: {
      return {
        ...state,
        latestBooksReleaseResult: action.newLatestBooksReleaseResult,
      }
    }
    case SAVE_LATEST_VIDEO_GAMES_RELEASE_RESULT: {
      return {
        ...state,
        latestVideoGamesReleaseResult: action.newLatestVideoGamesReleaseResult,
      }
    }
    // ------------------------------
    case SET_LATEST_MOVIES_RELEASE_LOADING: {
      return {
        ...state,
        latestMoviesReleaseLoading: action.newLatestMoviesReleaseLoading,
      }
    }
    case SET_LATEST_SERIES_RELEASE_LOADING: {
      return {
        ...state,
        latestSeriesReleaseLoading: action.newLatestSeriesReleaseLoading,
      }
    }
    case SET_LATEST_BOOKS_RELEASE_LOADING: {
      return {
        ...state,
        latestBooksReleaseLoading: action.newLatestBooksReleaseLoading,
      }
    }
    case SET_LATEST_VIDEO_GAMES_RELEASE_LOADING: {
      return {
        ...state,
        latestVideoGamesReleaseLoading: action.newLatestVideoGamesReleaseLoading,
      }
    }
    // ------------------------------
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer;