/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
import './style.scss';

function MenuIcon({ icon }) {
  const Icon = icon;
  return (
    <div className='main__menu-link-icon'>
      <Icon />
    </div>
  );
}

MenuIcon.propTypes = {
  
};

export default MenuIcon;
