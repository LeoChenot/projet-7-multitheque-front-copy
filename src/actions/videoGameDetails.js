export const FETCH_VIDEO_GAME_DETAILS_BY_ID = 'FETCH_VIDEO_GAME_DETAILS_BY_ID';
export const SET_VIDEO_GAME_DETAILS_LOADING = 'SET_VIDEO_GAME_DETAILS_LOADING';
export const SAVE_VIDEO_GAME_DETAILS_RESULT = 'SAVE_VIDEO_GAME_DETAILS_RESULT';

export const fetchVideoGameDetailsById = (videoGameId) => ({
  type: FETCH_VIDEO_GAME_DETAILS_BY_ID,
  videoGameId,
});

export const setVideoGameDetailsLoading = (newVideoGameDetailsLoading) => ({
  type: SET_VIDEO_GAME_DETAILS_LOADING,
  newVideoGameDetailsLoading,
});

export const saveVideoGameDetailsResult = (newVideoGameDetailsResult) => ({
  type: SAVE_VIDEO_GAME_DETAILS_RESULT,
  newVideoGameDetailsResult,
});