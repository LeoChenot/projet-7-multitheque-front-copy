export const FETCH_MOVIE_DETAILS_BY_ID = 'FETCH_MOVIE_DETAILS_BY_ID';
export const SET_MOVIE_DETAILS_LOADING = 'SET_MOVIE_DETAILS_LOADING';
export const SAVE_MOVIE_DETAILS_RESULTS = 'SAVE_MOVIE_DETAILS_RESULTS';

export const fetchMovieDetailsById = (movieId) => ({
  type: FETCH_MOVIE_DETAILS_BY_ID,
  movieId,
});

export const setMovieDetailsLoading = (newMovieDetailsLoading) => ({
  type: SET_MOVIE_DETAILS_LOADING,
  newMovieDetailsLoading,
});

export const saveMovieDetailsResults = (newMovieDetailsResult, newMovieDetailsCastResult) => ({
  type: SAVE_MOVIE_DETAILS_RESULTS,
  newMovieDetailsResult,
  newMovieDetailsCastResult,
});