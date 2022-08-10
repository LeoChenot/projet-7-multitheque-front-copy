import { combineReducers } from 'redux';

import headerReducer from './header';
import mainMenuReducer from './mainMenu';
import registerReducer from './register';
import loginModalReducer from './login';
import userReducer from './user';
import profileReducer from './profile';
import searchResultsReducer from './searchResults';

import movieDetailsReducer from './movieDetails';
import seriesDetailsReducer from './seriesDetails';
import bookDetailsReducer from './bookDetails';
import videoGameDetailsReducer from './videoGameDetails';

import homePageReducer from './homePage';

const rootReducer = combineReducers({
  header: headerReducer,
  mainMenu: mainMenuReducer,
  register: registerReducer,
  login: loginModalReducer,
  user: userReducer,
  profile: profileReducer,
  searchResults: searchResultsReducer,
  movieDetails: movieDetailsReducer,
  seriesDetails: seriesDetailsReducer,
  bookDetails: bookDetailsReducer,
  videoGameDetails: videoGameDetailsReducer,
  homePage: homePageReducer,
});

export default rootReducer;