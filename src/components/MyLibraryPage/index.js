import './style.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const MyLibraryPage = (props) => {
  const libraryType = props.library;
  const [isLoaded, setIsLoaded] = useState(false);
  const [libraryList, setLibraryList] = useState([]);
  const token = localStorage.getItem('token');
  let baseURL = "https://image.tmdb.org/t/p/original";

  const fetchLibrary = async () => {
    setLibraryList([]);
    setIsLoaded(false);
    try {
      const response = await axios.get(`https://collectio-app.herokuapp.com/api/${libraryType}`, { 
        headers: {
          "authorization": token
        }
       });
      if (response.status === 200) {
        setLibraryList(response.data);
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect (() => {
    fetchLibrary();
  }, [libraryType]);

  if (libraryList.length === 0) {
    return (
      <section className="myLibraryPage">
        <h2>My Library</h2>
        <div className="myLibraryPage_Container">
          {!isLoaded ? (
            <Loader />
          ) : (
          <div className='myLibraryPage_Container-container'>
            <h3>You don't have any {libraryType}.</h3>
          </div>
          )}
        </div>
      </section>
    )
  }
  else {
    return (
      <section className="myLibraryPage">
        <h2>My Library</h2>
        <div className="myLibraryPage_Container">
          {!isLoaded ? (
            <Loader />
          ) : (
          <div className='myLibraryPage_Container-container'>
            {libraryList.map(el => (
              <Link key={el.apimediaid} to={`/${el.mediatypename === 'video_game' ? 'video-games' : (el.mediatypename !== 'series' ? `${el.mediatypename}s` : el.mediatypename)}/${el.apimediaid}`}>
                <div className='myLibraryPage_Element' key={el.apimediaid}>
                    <img className='myLibraryPage_Element_img' src={`${el.coverurl.startsWith('/') ? baseURL : ''}${el.coverurl}`} alt={el.title} />
                    <p>{el.title}</p>
                    <p className={`listname ${el.listname}Color`}>
                      {
                        el.mediatypename === 'movie' ? el.listname === 'check' ? 'watched' : el.listname === 'in_progress' ? 'in progress' : el.listname
                        : el.mediatypename === 'series' ? el.listname === 'check' ? 'watched' : el.listname === 'in_progress' ? 'in progress' : el.listname
                        : el.mediatypename === 'book' ? el.listname === 'check' ? 'read' : el.listname === 'in_progress' ? 'in progress' : el.listname
                        : el.mediatypename === 'video_game' ? el.listname === 'check' ? 'played' : el.listname === 'in_progress' ? 'in progress' : el.listname
                        : el.listname
                      }
                    </p>
                  </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    )
  }
};

export default MyLibraryPage;