import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { toggleLoginModal } from '../../actions/header';
import { logout } from '../../actions/login';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import LogoutPage from '../LogoutPage';
import ProfilePage from '../ProfilePage';
import LibraryPage from '../LibraryPage';
import RegisterPage from '../RegisterPage';
import ResultsPage from '../ResultsPage';
import MyLibrairyPage from '../MyLibraryPage';
import './style.scss';
import MovieDetails from '../MovieDetails';
import SeriesDetails from '../SeriesDetails';
import BookDetails from '../BookDetails';
import VideoGameDetails from '../VideoGameDetails';
import ContactPage from '../ContactPage';
import ErrorPage from '../ErrorPage';
import AboutPage from '../AboutPage';

function MainScreen() {
  
  // importer ici le useSelector
  
  return (
    <div className="main__screen">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
        <Route path='/results/:searchBar'  element={<ResultsPage />} />

        <Route path='/movies/:mediaId' element={<MovieDetails />} />
        <Route path='/series/:mediaId' element={<SeriesDetails />} />
        <Route path='/books/:mediaId' element={<BookDetails />} />
        <Route path='/video-games/:mediaId' element={<VideoGameDetails />} />
        {/* { isLogged?
            Route if true   :
            Route if False
          } */}

        <Route path='/movies' element={<MyLibrairyPage library='movie'/>} />
        <Route path='/series' element={<MyLibrairyPage library='series'/>} />
        <Route path='/books' element={<MyLibrairyPage library='book'/>} />
        <Route path='/video-games' element={<MyLibrairyPage library='video_game'/>} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

MainScreen.propTypes = {

};

export default MainScreen;
