import Glide from '@glidejs/glide/dist/glide';
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

import { useEffect, useRef } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchInAllApiByTitle } from '../../actions/searchResults';
import Loader from '../Loader';
import { changeInputValueHeader } from '../../actions/header';

function ResultsPage() {

  const dispatch = useDispatch();
  const isInitialMount = useRef(true);

  const title = useParams().searchBar;
  const menuIsOpen = useSelector((state) => state.mainMenu.isOpen);
  const {
    foundMoviesLoading,
    foundSeriesLoading,
    foundBooksLoading,
    foundVideoGamesLoading,

    foundMoviesResult,
    foundSeriesResult,
    foundBooksResult,
    foundVideoGamesResult,
  } = useSelector((state) => state.searchResults);

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
    console.log('Je fetch all');
    dispatch(fetchInAllApiByTitle(title));
    dispatch(changeInputValueHeader("searchBar", ""));
  }, [title]);

  useEffect(() => {
    if (!foundMoviesLoading) {
      new Glide("#glideMovies", gliderOptions).mount();
    }
  }, [foundMoviesLoading]);

  useEffect(() => {
    if (!foundSeriesLoading) {
      new Glide("#glideSeries", gliderOptions).mount();
    }
  }, [foundSeriesLoading]);

  useEffect(() => {
    if (!foundBooksLoading) {
      new Glide("#glideBooks", gliderOptions).mount();
    }
  }, [foundBooksLoading]);

  useEffect(() => {
    if (!foundVideoGamesLoading) {
      new Glide("#glideVideoGames", gliderOptions).mount();
    }
  }, [foundVideoGamesLoading]);
  


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
    <div className="homePage">
      
      <div className="homePage-container">
        <h2 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1.2em' }}>Movies</h2>
        {foundMoviesLoading ? (
          <div style={{ padding: '5em 0' }}>
            <Loader />
          </div>
        ) : (
          <div className="glideContainer">
            <div id="glideMovies" className="glide" style={{ transition: 'all 550ms' }}>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                {foundMoviesResult && foundMoviesResult.results.map((item) => (
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
        {foundSeriesLoading ? (
          <div style={{ padding: '5em 0' }}>
            <Loader />
          </div>
        ) : (
          <div className="glideContainer">
            <div id="glideSeries" className="glide" style={{ transition: 'all 550ms' }}>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                {foundSeriesResult && foundSeriesResult.results.map((item) => (
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
        {foundBooksLoading ? (
          <div style={{ padding: '5em 0' }}>
            <Loader />
          </div>
        ) : (
          <div className="glideContainer">
            <div id="glideBooks" className="glide" style={{ transition: 'all 550ms' }}>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                {foundBooksResult && foundBooksResult.items.map((item) => (
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
        {foundVideoGamesLoading ? (
          <div style={{ padding: '5em 0' }}>
            <Loader />
          </div>
        ) : (
          <div className="glideContainer">
            <div id="glideVideoGames" className="glide" style={{ transition: 'all 550ms' }}>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                {foundVideoGamesResult && foundVideoGamesResult.results.map((item) => (
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

export default ResultsPage;