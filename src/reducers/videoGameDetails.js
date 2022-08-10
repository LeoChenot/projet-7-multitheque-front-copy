import { SAVE_VIDEO_GAME_DETAILS_RESULT, SET_VIDEO_GAME_DETAILS_LOADING } from "../actions/videoGameDetails";

const initialState = {
  videoGameDetailsLoading: true,
  videoGameDetailsResult: undefined,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_VIDEO_GAME_DETAILS_RESULT: {
      return {
        ...state,
        videoGameDetailsResult: action.newVideoGameDetailsResult,
      }
    }
    case SET_VIDEO_GAME_DETAILS_LOADING: {
      return {
        ...state,
        videoGameDetailsLoading: action.newVideoGameDetailsLoading,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;