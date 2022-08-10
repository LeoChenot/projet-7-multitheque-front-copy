import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/login';

function LogoutPage() {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(logout());
    navigate('/');
  };
  useEffect(() => {
  
      logoutFunction();
   
    // return () => {
    //   logoutFunction();
    // }
  }, []);

  return (
    <div className="LogoutPage">
      logoutpage
    </div>
  );
}

LogoutPage.propTypes = {
  
};

export default LogoutPage;
