import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { FaHome, FaFilm, FaTv, FaBook, FaGamepad, FaAddressBook, FaInfo, FaQuestion } from 'react-icons/fa';

import './style.scss';
import MenuIcon from '../MenuIcon';
import { useSelector } from 'react-redux';

function MainMenu() {
  const categoriesDataTemp = [
    {
      name: 'Movies',
      route: '/movies',
      icon: FaFilm,
    },
    {
      name: 'Series',
      route: '/series',
      icon: FaTv,
    },
    {
      name: 'Books',
      route: '/books',
      icon: FaBook,
    },
    {
      name: 'Video games',
      route: '/video-games',
      icon: FaGamepad,
    },
  ];

  const isOpen = useSelector((state) => state.mainMenu.isOpen);
  const { auth } = useSelector((state) => state.user);

  return (
    <div className="main__menu" style={{width: isOpen ? '18em' : '0'}}>
      <div className="main__menu-section--first">
        <NavLink
          key="home"
          to="/"
          className={({isActive}) => `main__menu-link ${isActive ? 'main__menu-link--active' : ''}`}
        >
          <MenuIcon icon={FaHome} />
          Home
        </NavLink>
      </div>
      {auth && (
        <div className="main__menu-section">
          <span className="main__menu-section-label">
            My collections
          </span>
          {categoriesDataTemp.map((category) => (
            <NavLink
              key={category.route}
              to={category.route}
              className={({isActive}) => `main__menu-link ${isActive ? 'main__menu-link--active' : ''}`}
            >
              <MenuIcon icon={category.icon} />
              {category.name}
            </NavLink>
          ))}
        </div>
        
      )}
      <div className="main__menu-section">
        <span className="main__menu-section-label">
          Other
        </span>
        <NavLink
          key="contact"
          to="/contact"
          className={({isActive}) => `main__menu-link ${isActive ? 'main__menu-link--active' : ''}`}
        >
          <MenuIcon icon={FaAddressBook} />
          Contact
        </NavLink>
        <NavLink
          key="about"
          to="/about"
          className={({isActive}) => `main__menu-link ${isActive ? 'main__menu-link--active' : ''}`}
        >
          <MenuIcon icon={FaInfo} />
          About
        </NavLink>
      </div>
    </div>
  );
}

MainMenu.propTypes = {
  
};

export default MainMenu;
