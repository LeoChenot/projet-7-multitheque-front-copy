import Glide from '@glidejs/glide/dist/glide';
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

import React, { useEffect, useRef } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLatestMoviesRelease,
  fetchLatestSeriesRelease,
  fetchLatestBooksRelease,
  fetchLatestVideoGamesRelease,
} from '../../actions/homePage';
import Loader from '../Loader';
import { useLayoutEffect } from 'react';

function HomePage() {
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const homePageDiv = useRef(null);

  const menuIsOpen = useSelector((state) => state.mainMenu.isOpen);
  const { 
    latestMoviesReleaseLoading,
    latestSeriesReleaseLoading,
    latestBooksReleaseLoading,
    latestVideoGamesReleaseLoading,

    latestMoviesReleaseResult,
    latestSeriesReleaseResult,
    latestBooksReleaseResult,
    latestVideoGamesReleaseResult,
  } = useSelector((state) => state.homePage);

  const gliderOptions = {
    type: 'slider',
    startAt: 0,
    bound: true,
    focusAt: 0,
    perView: menuIsOpen ? 7 : 9,
    keyboard: false,
    swipeThreshold: false,
    dragThreshold: false,
    breakpoints: {
      1650: {
        perView: menuIsOpen ? 5 : 7,
      },
      1250: {
        perView: menuIsOpen ? 3 : 5,
      },
      880: {
        perView: menuIsOpen ? 1 : 3,
      },
      590: {
        perView: 1,
      }
    }
  }


  useEffect(() => {
    if (typeof latestMoviesReleaseResult === "undefined") {
      dispatch(fetchLatestMoviesRelease());
    }
    if (typeof latestSeriesReleaseResult === "undefined") {
      dispatch(fetchLatestSeriesRelease());
    }
    if (typeof latestBooksReleaseResult === "undefined") {
      dispatch(fetchLatestBooksRelease());
    }
    if (typeof latestVideoGamesReleaseResult === "undefined") {
      dispatch(fetchLatestVideoGamesRelease());
    }
  }, []);


  useEffect(() => {
    if (!latestMoviesReleaseLoading) {
      new Glide("#glideMovies", gliderOptions).mount();
    }
  }, [latestMoviesReleaseLoading]);

  useEffect(() => {
    if (!latestSeriesReleaseLoading) {
      new Glide("#glideSeries", gliderOptions).mount();
    }
  }, [latestSeriesReleaseLoading]);

  useEffect(() => {
    if (!latestBooksReleaseLoading) {
      new Glide("#glideBooks", gliderOptions).mount();
    }
  }, [latestBooksReleaseLoading]);

  useEffect(() => {
    if (!latestVideoGamesReleaseLoading) {
      new Glide("#glideVideoGames", gliderOptions).mount();
    }
  }, [latestVideoGamesReleaseLoading]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      setTimeout(() => {
        new Glide("#glideMovies", gliderOptions).mount();
        new Glide("#glideSeries", gliderOptions).mount();
        new Glide("#glideBooks", gliderOptions).mount();
        new Glide("#glideVideoGames", gliderOptions).mount();
      }, menuIsOpen ? 565 : 420);
    }
  }, [menuIsOpen]);

  return (
    <div className="homePage" ref={homePageDiv}>
        <div className="homePage-container">
          <h2 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1.2em' }}>Movies</h2>
          {latestMoviesReleaseLoading ? (
            <div style={{ padding: '5em 0' }}>
              <Loader />
            </div>
          ) : (
            <div className="glideContainer">
              <div id="glideMovies" className="glide" style={{ transition: 'all 550ms' }}>
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                  {latestMoviesReleaseResult && latestMoviesReleaseResult.results.map((item) => (
                    <li key={item.id} className="glide__slide">
                      <Link to={`/movies/${item.id}`} className="glide__slide-link">
                        <img className="glide__slide-link-image" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                        <span className="glide__slide-link-title">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                  </ul>
                  <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="homePage-container">
          <h2 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1.2em' }}>Series</h2>
          {latestSeriesReleaseLoading ? (
            <div style={{ padding: '5em 0' }}>
              <Loader />
            </div>
          ) : (
            <div className="glideContainer">
              <div id="glideSeries" className="glide" style={{ transition: 'all 550ms' }}>
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                  {latestSeriesReleaseResult && latestSeriesReleaseResult.results.map((item) => (
                      <li key={item.id} className="glide__slide">
                        <Link to={`/series/${item.id}`} className="glide__slide-link">
                          <img className="glide__slide-link-image" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.name} />
                          <span className="glide__slide-link-title">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="homePage-container">
          <h2 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1.2em' }}>Books</h2>
          {latestBooksReleaseLoading ? (
            <div style={{ padding: '5em 0' }}>
              <Loader />
            </div>
          ) : (
            <div className="glideContainer">
              <div id="glideBooks" className="glide" style={{ transition: 'all 550ms' }}>
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                  {latestBooksReleaseResult && latestBooksReleaseResult.items.map((item) => (
                      <li key={item.id} className="glide__slide">
                        <Link to={`/books/${item.id}`} className="glide__slide-link">
                          <img className="glide__slide-link-image" src={item.volumeInfo.imageLinks && (item.volumeInfo.imageLinks.thumbnail) && item.volumeInfo.imageLinks.smallThumbnail } alt={item.name} />
                          <span className="glide__slide-link-title">{item.volumeInfo.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="homePage-container">
          <h2 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1.2em' }}>Video Games</h2>
          {latestVideoGamesReleaseLoading ? (
            <div style={{ padding: '5em 0' }}>
              <Loader />
            </div>
          ) : (
            <div className="glideContainer">
              <div id="glideVideoGames" className="glide" style={{ transition: 'all 550ms' }}>
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                  {latestVideoGamesReleaseResult && latestVideoGamesReleaseResult.results.map((item) => (
                      <li key={item.name} className="glide__slide">
                        <Link to={`/video-games/${item.id}`} className="glide__slide-link">
                          <img className="glide__slide-link-image" src={item.background_image} alt={item.name} />
                          <span className="glide__slide-link-title">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    
    </div>

    
  );
}

export default HomePage;
