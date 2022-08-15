import axios from "axios";
import { FETCH_LATEST_MOVIES_RELEASE, saveLatestMoviesReleaseResult, setLatestMoviesReleaseLoading } from "../actions/homePage";
import { FETCH_MOVIE_DETAILS_BY_ID, saveMovieDetailsResults, setMovieDetailsLoading } from "../actions/movieDetails";
import { FETCH_IN_ALL_API_BY_TITLE, saveFoundMoviesResult, setFoundMoviesLoading } from "../actions/searchResults";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const moviesApiKey = '6131d818d4662f765b6cac7e2bcddae1';
const defaultTimeout = 500;
const timeout = 500;

const fetchMoviesMW = (store) => (next) => async (action) => {
  if (action.type === FETCH_LATEST_MOVIES_RELEASE) {
    try {
      const latestMoviesReleaseResult = await instance.get(`/movie/now_playing?api_key=${moviesApiKey}&language=en-US`);
      store.dispatch(saveLatestMoviesReleaseResult(latestMoviesReleaseResult.data));
      setTimeout(() => {
        store.dispatch(setLatestMoviesReleaseLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_IN_ALL_API_BY_TITLE) {
    store.dispatch(setFoundMoviesLoading(true));
    try {
      const foundMoviesResult = await instance.get(`/search/movie?query=${action.title}&api_key=${moviesApiKey}&language=en-US&page=1`);
      store.dispatch(saveFoundMoviesResult(foundMoviesResult.data));
      setTimeout(() => {
        store.dispatch(setFoundMoviesLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_MOVIE_DETAILS_BY_ID) {
    store.dispatch(setMovieDetailsLoading(true));
    try {
      const movieDetailsResult = await instance.get(`/movie/${action.movieId}?api_key=${moviesApiKey}&language=en-US`);
      const movieDetailsCastResult = await instance.get(`/movie/${action.movieId}/credits?api_key=${moviesApiKey}&language=en-US`);
      
      store.dispatch(saveMovieDetailsResults(movieDetailsResult.data, movieDetailsCastResult.data));
      setTimeout(() => {
        store.dispatch(setMovieDetailsLoading(false));
      }, defaultTimeout);
    } catch (error) {
      console.log(error);
    }
  }
  next(action);
}

export default fetchMoviesMW;