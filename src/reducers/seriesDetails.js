import { SAVE_SERIES_DETAILS_RESULTS, SET_SERIES_DETAILS_LOADING } from "../actions/seriesDetails";

const initialState = {
  seriesDetailsLoading: true,
  seriesDetailsResults: {
    seriesDetailsResult: undefined,
    seriesDetailsCastResult: undefined,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_SERIES_DETAILS_RESULTS: {
      return {
        ...state,
        seriesDetailsResults: {
          ...state.seriesDetailsResults,
          seriesDetailsResult: action.newSeriesDetailsResult,
          seriesDetailsCastResult: action.newSeriesDetailsCastResult,
        },
      }
    }
    case SET_SERIES_DETAILS_LOADING: {
      return {
        ...state,
        seriesDetailsLoading: action.newSeriesDetailsLoading,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;