import './style.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyLibraryPage = (props) => {
  const libraryType = props.library;
  const [isLoaded, setIsLoaded] = useState(false);
  const [libraryList, setLibraryList] = useState([]);
  const token = localStorage.getItem('token');
  let baseURL = "https://image.tmdb.org/t/p/original";
  // const tokenTest = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY1Mjc3NzE2MSwiZXhwIjoxNzM5MTc3MTYxfQ.qBFTFlkJvKz8f106Axdtsot-Xx43gaf3lAP3Hch5dm4`

  const fetchLibrary = async () => {
    setLibraryList([]);
    try {
      const response = await axios.get(`https://collectio-app.herokuapp.com/api/${libraryType}`, { 
        headers: {
          "authorization": token
        }
       });
      if (response.status === 200) {
        console.log('response :', response.data);
        setIsLoaded(true)
        setLibraryList(response.data)
      };
    } catch (error) {
      console.log(error)
    }
  };

  useEffect (() => {
    //return () => {
      fetchLibrary()
    //}
  }, [libraryType])

  console.log(libraryList)

  if (isLoaded) {
    return (
      <section className="myLibraryPage">
        <h2>My Library</h2>
        <div className="myLibraryPage_Container">
          <div className='myLibraryPage_Container-container'>
            {libraryList.map(el => (
              <Link to={`/${el.mediatypename === 'video_game' ? 'video-games' : (el.mediatypename !== 'series' ? `${el.mediatypename}s` : el.mediatypename)}/${el.apimediaid}`}>
                <div className='myLibraryPage_Element' key={el.apimediaid}>
                    <img className='myLibraryPage_Element_img' src={`${el.coverurl.startsWith('/') ? baseURL : ''}${el.coverurl}`} alt="blabla"></img>
                    <p>{el.title}</p>
                    <p className={`listname ${el.listname}Color`}>
                      {el.mediatypename === 'video_game' ? el.listname === 'check' ? 'played' : el.listname : el.mediatypename === 'book' ? el.listname === 'check' ? 'read' : el.listname : (el.listname === 'check' ? 'watched' : el.listname)}
                    </p>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }
};

export default MyLibraryPage;