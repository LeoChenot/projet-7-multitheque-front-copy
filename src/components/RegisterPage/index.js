/* eslint-disable react/prop-types */

import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeInputValueRegister, setFetchRegisterResponseCode } from '../../actions/register';
import { fetchCreateUser } from '../../actions/user';
import './style.scss';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  const {
    firstName,
    lastName,
    username,
    bYear,
    bMonth,
    bDay,
    email,
    password1,
    password2,

    fetchRegisterResponseCode,
  } =  useSelector((state) => state.register);

  const { auth } = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    if (!noError) {
      return window.alert("Veuillez corriger le formulaire!")
    }
    event.preventDefault();
    dispatch(fetchCreateUser());
  }

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailErrorMessage = ''; 
  if (!EMAIL_REGEX.test(email) && email.length>0) {
    emailErrorMessage = "email not valid";
  }

  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?()'"§€£+=-_$%^&*]).{8,}$/;
  let passwordErrorMessage = ''; 
  if (!PASSWORD_REGEX.test(password1) && password1.length>0) {
    passwordErrorMessage = 'password not valid: at least 8 chars (uppercase AND lowercase), at least one number, at least one special char';
  }
  
  let passwordConfirmMessage = '';
  if (password2.length>0 && password2 !== password1) {
    passwordConfirmMessage = 'passwords must match';
  }

  let usernameErrorMessage = '';
  if (username.length>0 && (username.length >= 17 || username.length <= 2)) {
    usernameErrorMessage = 'wrong username (length must be: 3 - 16)'
  }

  const noError = emailErrorMessage === "" && passwordErrorMessage === "" && passwordConfirmMessage === "" && usernameErrorMessage === "" && email !== "" && password1 !== "" && password2 !== "" && firstName !== "" && lastName !== "";





  useEffect(() => {
    if (typeof fetchRegisterResponseCode !== 'undefined') {
      if (fetchRegisterResponseCode === 201) {
        navigate('/login');
        dispatch(setFetchRegisterResponseCode(undefined));
      }
    }
  }, [fetchRegisterResponseCode]);

  useEffect(() => {
    if (auth) {
      navigate("/login");
    }
  }, [auth]);

  const years = [];
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const days = [];
  
  
  let iteration = 120;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  for (let index = 0; index <= iteration; index++) {
    years.push(currentYear - index);
  }

  
  useEffect(() => {

  }, []);

  if (bMonth !== '') {
    let numberMonth = null;
    months.forEach((month) => {
      if (bMonth === month.toLowerCase()) {
        numberMonth = months.indexOf(month) + 1;
      }
    });
    const numberOfDays = new Date(Number(bYear), numberMonth, 0).getDate();
    for (let index = 1; index <= numberOfDays; index++) {
      days.push(index);
    }
  }

  return (
    <div className="registerPage">
      <form className="registerPage__form" onSubmit={handleSubmit}>
        <h2 className="registerPage__title">Sign Up</h2>
        <fieldset className="registerPage__form-fieldset">
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-firstname">Firstname</label>
            <input
              className="registerPage__form-fieldset-container-input"
              type="text"
              id="registerPage-firstname"
              value={firstName}
              onChange={(event) => dispatch(changeInputValueRegister("firstName", event.target.value))}
              autoComplete="name"
            />
          </div>
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-lastname">Lastname</label>
            <input
              className="registerPage__form-fieldset-container-input"
              type="text"
              id="registerPage-lastname"
              value={lastName}
              onChange={(event) => dispatch(changeInputValueRegister("lastName", event.target.value))}
              autoComplete="family-name"
            />
          </div>
        </fieldset>
        <fieldset className="registerPage__form-fieldset">
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-username">Username</label>
            <input 
              className="registerPage__form-fieldset-container-input"
              type="text"
              id="registerPage-username"
              value={username}
              onChange={(event) => dispatch(changeInputValueRegister("username", event.target.value))}
              autoComplete="username"
            />
            <p>{usernameErrorMessage}</p>
          </div>
        </fieldset>
        <fieldset className="registerPage__form-fieldset">
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-bYear">Year</label>
            <select
              className="registerPage__form-fieldset-container-input"
              id="registerPage-bYear"
              value={bYear}
              onChange={(event) => dispatch(changeInputValueRegister("bYear", event.target.value))}
            >
              <option value={null} hidden></option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-bMonth">Month</label>
            <select
              className="registerPage__form-fieldset-container-input"
              id="registerPage-bMonth"
              value={bMonth}
              onChange={(event) => dispatch(changeInputValueRegister("bMonth", event.target.value))}
              disabled={bYear !== '' ? false : true}
            >
              <option value={null} hidden></option>
              {months.map((month) => (
                <option key={month} value={month.toLowerCase()}>{month}</option>
              ))}
            </select>
          </div>
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-bDay">Day</label>
            <select
              className="registerPage__form-fieldset-container-input"
              id="registerPage-bDay"
              value={bDay}
              onChange={(event) => dispatch(changeInputValueRegister("bDay", event.target.value))}
              disabled={bMonth !== '' ? false : true}
            >
              <option value={null} hidden></option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset className="registerPage__form-fieldset">
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-email">Email</label>
            <input
              className="registerPage__form-fieldset-container-input"
              type="email" id="registerPage-email"
              value={email}
              onChange={(event) => dispatch(changeInputValueRegister("email", event.target.value))}
              autoComplete="email"
            />
            <p>{emailErrorMessage}</p>
          </div>
        </fieldset>
        <fieldset className="registerPage__form-fieldset">
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-password1">Password</label>
            <input
              className="registerPage__form-fieldset-container-input"
              type="password" id="registerPage-password1"
              value={password1}
              onChange={(event) => dispatch(changeInputValueRegister("password1", event.target.value))}
              autoComplete="new-password"
              />
              <p className="labelPassword">{passwordErrorMessage}</p>
          </div>
          <div className="registerPage__form-fieldset-container">
            <label className="registerPage__form-fieldset-container-label" htmlFor="registerPage-password2">Confirm</label>
            <input
              className="registerPage__form-fieldset-container-input"
              type="password" id="registerPage-password2"
              value={password2}
              onChange={(event) => dispatch(changeInputValueRegister("password2", event.target.value))}
              autoComplete="new-password"
            />
            <p>{passwordConfirmMessage}</p>
          </div>
        </fieldset>
        <button className="registerPage__form-submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

RegisterPage.propTypes = {
  
};

export default RegisterPage;
