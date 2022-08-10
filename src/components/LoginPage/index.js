import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeInputValueLogin, login } from '../../actions/login';
import './style.scss';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } =  useSelector((state) => state.login);
  const { auth } = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Je veux me connecter');
    dispatch(login());
  }
  
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <div className="loginPage">
      <form className="loginPage__form" onSubmit={handleSubmit}>
        <h2 className="loginPage__title">Sign In</h2>
        <fieldset className="loginPage__form-fieldset">
          <div className="loginPage__form-fieldset-container">
            <label className="loginPage__form-fieldset-container-label" htmlFor="loginPage-email">Email</label>
            <input
              className="loginPage__form-fieldset-container-input"
              type="email" id="loginPage-email"
              value={email}
              onChange={(event) => dispatch(changeInputValueLogin("email", event.target.value))}
              autoComplete="email"
            />
          </div>
        </fieldset>
        <fieldset className="loginPage__form-fieldset">
          <div className="loginPage__form-fieldset-container">
            <label className="loginPage__form-fieldset-container-label" htmlFor="loginPage-password">Password</label>
            <input
              className="loginPage__form-fieldset-container-input"
              type="password" id="loginPage-password"
              value={password}
              onChange={(event) => dispatch(changeInputValueLogin("password", event.target.value))}
              autoComplete="password"
            />
          </div>
        </fieldset>
        <button className="loginPage__form-submit" type="submit">Sign In</button>
      </form>
    </div>
  );
}

LoginPage.propTypes = {
  
};

export default LoginPage;
