export const FETCH_SERIES_DETAILS_BY_ID = 'FETCH_SERIES_DETAILS_BY_ID';
export const SET_SERIES_DETAILS_LOADING = 'SET_SERIES_DETAILS_LOADING';
export const SAVE_SERIES_DETAILS_RESULTS = 'SAVE_SERIES_DETAILS_RESULTS';

export const fetchSeriesDetailsById = (seriesId) => ({
  type: FETCH_SERIES_DETAILS_BY_ID,
  seriesId,
});

export const setSeriesDetailsLoading = (newSeriesDetailsLoading) => ({
  type: SET_SERIES_DETAILS_LOADING,
  newSeriesDetailsLoading,
});

export const saveSeriesDetailsResults = (newSeriesDetailsResult, newSeriesDetailsCastResult) => ({
  type: SAVE_SERIES_DETAILS_RESULTS,
  newSeriesDetailsResult,
  newSeriesDetailsCastResult,
});