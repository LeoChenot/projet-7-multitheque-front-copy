import axios from "axios";
import { FETCH_LATEST_SERIES_RELEASE, saveLatestSeriesReleaseResult, setLatestSeriesReleaseLoading } from "../actions/homePage";
import { FETCH_IN_ALL_API_BY_TITLE, saveFoundSeriesResult, setFoundSeriesLoading } from "../actions/searchResults";
import { FETCH_SERIES_DETAILS_BY_ID, saveSeriesDetailsResults, setSeriesDetailsLoading } from "../actions/seriesDetails";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const seriesApiKey = '53d8914dec27b153e9ddc38fedcfb93e';
const defaultTimeout = 500;
const timeout = 1000;

const fetchSeriesMW = (store) => (next) => async (action) => {
  if (action.type === FETCH_LATEST_SERIES_RELEASE) {
    try {
      const latestSeriesReleaseResult = await instance.get(`/tv/on_the_air?api_key=${seriesApiKey}&language=en-US`);
      store.dispatch(saveLatestSeriesReleaseResult(latestSeriesReleaseResult.data));
      setTimeout(() => {
        store.dispatch(setLatestSeriesReleaseLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_IN_ALL_API_BY_TITLE) {
    store.dispatch(setFoundSeriesLoading(true));
    try {
      const foundSeriesResult = await instance.get(`/search/tv?query=${action.title}&api_key=${seriesApiKey}&language=en-US&page=1`);
      store.dispatch(saveFoundSeriesResult(foundSeriesResult.data));
      setTimeout(() => {
        store.dispatch(setFoundSeriesLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_SERIES_DETAILS_BY_ID) {
    store.dispatch(setSeriesDetailsLoading(true));
    try {
      const seriesDetailsResult = await instance.get(`/tv/${action.seriesId}?api_key=${seriesApiKey}&language=en-US`);
      const seriesDetailsCastResult = await instance.get(`/tv/${action.seriesId}/credits?api_key=${seriesApiKey}&language=en-US`);
      
      store.dispatch(saveSeriesDetailsResults(seriesDetailsResult.data, seriesDetailsCastResult.data));
      setTimeout(() => {
        store.dispatch(setSeriesDetailsLoading(false));        
      }, defaultTimeout);
    } catch (error) {
      console.log(error);
    }
  }
  next(action);
}

export default fetchSeriesMW;