import { SAVE_MOVIE_DETAILS_RESULTS, SET_MOVIE_DETAILS_LOADING } from "../actions/movieDetails";

const initialState = {
  movieDetailsLoading: true,
  movieDetailsResults: {
    movieDetailsResult: undefined,
    movieDetailsCastResult: undefined,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_MOVIE_DETAILS_RESULTS: {
      return {
        ...state,
        movieDetailsResults: {
          ...state.movieDetailsResults,
          movieDetailsResult: action.newMovieDetailsResult,
          movieDetailsCastResult: action.newMovieDetailsCastResult,
        },
      }
    }
    case SET_MOVIE_DETAILS_LOADING: {
      return {
        ...state,
        movieDetailsLoading: action.newMovieDetailsLoading,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;