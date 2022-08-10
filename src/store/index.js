import { createStore, applyMiddleware, compose } from "redux";
import authMW from "../middlewares/authMW";
import fetchBooksMW from "../middlewares/fetchBooksMW";
import fetchMoviesMW from "../middlewares/fetchMoviesMW";
import fetchSeriesMW from "../middlewares/fetchSeriesMW";
import fetchVideoGamesMW from "../middlewares/fetchVideoGamesMW";

import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    authMW,
    fetchMoviesMW,
    fetchSeriesMW,
    fetchBooksMW,
    fetchVideoGamesMW,
  ),
);

const store = createStore(reducer, enhancers);

export default store;