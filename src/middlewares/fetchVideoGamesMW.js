import axios from "axios";
import { FETCH_LATEST_VIDEO_GAMES_RELEASE, saveLatestVideoGamesReleaseResult, setLatestVideoGamesReleaseLoading } from "../actions/homePage";
import { FETCH_IN_ALL_API_BY_TITLE, saveFoundVideoGamesResult, setFoundVideoGamesLoading } from "../actions/searchResults";
import { FETCH_VIDEO_GAME_DETAILS_BY_ID, saveVideoGameDetailsResult, setVideoGameDetailsLoading } from "../actions/videoGameDetails";

const instance = axios.create({
  baseURL: 'https://api.rawg.io/api',
});

const videoGamesApiKey = '445da378957044c0ad00ff9fe3f8e708';
const defaultTimeout = 500;
const timeout = 2000;

const fetchVideoGamesMW = (store) => (next) => async (action) => {
  if (action.type === FETCH_LATEST_VIDEO_GAMES_RELEASE) {
    try {
      // Récupération des dates dynamiques
      const currentNewDate = new Date();
      const currentYear = currentNewDate.getFullYear();
      const currentMonth = (currentNewDate.getMonth() + 1).toString().length < 2 ? `0${currentNewDate.getMonth() + 1}` : (currentNewDate.getMonth() + 1);
      const currentDay = (currentNewDate.getDate()).toString().length < 2 ? `0${currentNewDate.getDate()}` : currentNewDate.getDate();
    
      const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
      const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
      // ----------------------

      const latestVideoGamesReleaseResult = await instance.get(`/games?key=${videoGamesApiKey}&dates=${lastYear},${currentDate}`);
      // const latestVideoGamesReleaseResult = await instance.get(`/games?key=${videoGamesApiKey}&ordering=-released+-rating`);
      
      store.dispatch(saveLatestVideoGamesReleaseResult(latestVideoGamesReleaseResult.data));
      setTimeout(() => {
        store.dispatch(setLatestVideoGamesReleaseLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_IN_ALL_API_BY_TITLE) {
    store.dispatch(setFoundVideoGamesLoading(true));
    try {
      const foundVideoGamesResult = await instance.get(`/games?search=${action.title}&key=${videoGamesApiKey}`);
      store.dispatch(saveFoundVideoGamesResult(foundVideoGamesResult.data));
      setTimeout(() => {
        store.dispatch(setFoundVideoGamesLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_VIDEO_GAME_DETAILS_BY_ID) {
    store.dispatch(setVideoGameDetailsLoading(true));
    try {
      const videoGameDetailsResult = await instance.get(`/games/${action.videoGameId}?key=${videoGamesApiKey}`);
      
      store.dispatch(saveVideoGameDetailsResult(videoGameDetailsResult.data));
      setTimeout(() => {
        store.dispatch(setVideoGameDetailsLoading(false));        
      }, defaultTimeout);
    } catch (error) {
      console.log(error);
    }
  }
  next(action);
}

export default fetchVideoGamesMW;