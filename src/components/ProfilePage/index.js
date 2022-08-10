/* eslint-disable react/prop-types */
import { FaEdit, FaTimes, FaSave, FaTrash } from 'react-icons/fa';

import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditProfile } from '../../actions/profile';
import { useEffect, useRef } from 'react';
import { changeFetchReadUserResponse, fetchDeleteUser, fetchReadUser, fetchUpdateUser } from '../../actions/user';
import Loader from '../Loader';
import axios from 'axios';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const isInitialMount = useRef(true);

  const { edit } = useSelector((state) => state.profile);
  const {
    auth,
    fetchReadUserLoading,
    fetchReadUserResponse,
  } = useSelector((state) => state.user);
  
  // /**
  //  * ! show fetchReadUserResponse in console
  //  */
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   }
  //   else {
  //     if (typeof fetchReadUserResponse !== 'undefined') {
  //       console.log(fetchReadUserResponse);
  //     }
  //   }
  // }, [fetchReadUserResponse]);

  useEffect(() => {
    dispatch(fetchReadUser());
  }, []);

  const handleEdit = () => {
    console.log('Je veux editer mon profil');
    dispatch(toggleEditProfile());
  };

  const handleSubmitChangeProfile = (event) => {
    event.preventDefault();
    dispatch(fetchUpdateUser());
    dispatch(toggleEditProfile());
  }

  const onChangeInput = (event, stateName) => {
    dispatch(changeFetchReadUserResponse(stateName, event.target.value));
  }

  const handleDelete = () => {
    let sure = window.confirm("Are you sure ?");
    if (sure) {
      dispatch(fetchDeleteUser());
    }
  }

  const handleChangeImage = async (event) => {
    console.log(event.target.files[0]);
    console.log(event.target.files[0].name);


    const formData = new FormData();
    formData.append('image', event.target.files[0], event.target.files[0].name);
    const response = await axios.post(`http://localhost:4200/api/profile/6/upload`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    });
    console.log(response);
    dispatch(changeFetchReadUserResponse("pictureurl", response.data.url));

  }

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth]);


  // const handleCancelEdit = () => {
  //   console.log('Je ne veux plus editer mon profil');
  //   disptach(toggleEditProfile());
  // }

  // const handleSubmitChangeProfile = async () => {
  //   console.log('Je veux envoyer les nouvelles données');
  //   try {
  //     const response = await axios.patch(`https://collectio-app.herokuapp.com/api/profile/${localStorage.getItem('userId')}`);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  return (
    <div className="profilePage">
      <h2 className="profilePage-title">{localStorage.getItem("userId") && localStorage.getItem("userId") === userId ? 'My profile' : 'Profile'}</h2>
      {fetchReadUserLoading ? (
        <Loader />
      ) : (
        <form className="profilePage__user" onSubmit={handleSubmitChangeProfile}>
          <div className="profilePage__user-avatarContainer">
            {edit ? (
              <input style={{ width: '100%' }} type="file" onChange={handleChangeImage} accept="image/png, image/jpeg" />
            ): (
              <img className="profilePage__user-avatarContainer-avatar" src={fetchReadUserResponse.pictureurl} alt="" />
            )}
          </div>
          <div className="profilePage__user-informations">
            <div className="profilePage__user-informations-public">
              <div className="profilePage__user-informations-container">
                <fieldset className="profilePage__user-informations-container-fieldset">
                  <label className="profilePage__user-informations-container-fieldset-label" htmlFor="username">Username</label>
                  {edit ? (
                    <input type="text" className="profilePage__user-informations-container-fieldset-input" onChange={(event) => onChangeInput(event, 'username')} placeholder={fetchReadUserResponse.username} />
                  ) : (
                    <span className="profilePage__user-informations-container-fieldset-value">{fetchReadUserResponse.username}</span>
                  )}
                </fieldset>
              </div>
              <div className="profilePage__user-informations-container">
                <fieldset className="profilePage__user-informations-container-fieldset">
                  <label className="profilePage__user-informations-container-fieldset-label" htmlFor="firstname">Firstname</label>
                  {edit ? (
                    <input type="text" className="profilePage__user-informations-container-fieldset-input" onChange={(event) => onChangeInput(event, 'firstname')} placeholder={fetchReadUserResponse.firstname} />
                  ) : (
                    <span className="profilePage__user-informations-container-fieldset-value">{fetchReadUserResponse.firstname}</span>
                  )}
                </fieldset>
              <fieldset className="profilePage__user-informations-container-fieldset">
                <label className="profilePage__user-informations-container-fieldset-label" htmlFor="lastname">Lastname</label>
                {edit ? (
                  <input type="text" className="profilePage__user-informations-container-fieldset-input" onChange={(event) => onChangeInput(event, 'lastname')} placeholder={fetchReadUserResponse.lastname} />
                ) : (
                  <span className="profilePage__user-informations-container-fieldset-value">{fetchReadUserResponse.lastname}</span>
                )}
              </fieldset>
              </div>
              <div className="profilePage__user-informations-container">
                <fieldset className="profilePage__user-informations-container-fieldset">
                  <label className="profilePage__user-informations-container-fieldset-label" htmlFor="age">Age</label>
                  {edit ? (
                    <input type="text" className="profilePage__user-informations-container-fieldset-input" placeholder='18' />
                  ) : (
                    <span className="profilePage__user-informations-container-fieldset-value">18</span>
                  )}
                </fieldset>
                <fieldset className="profilePage__user-informations-container-fieldset">
                  <label className="profilePage__user-informations-container-fieldset-label" htmlFor="gender">Gender</label>
                  {edit ? (
                    <input type="text" className="profilePage__user-informations-container-fieldset-input" placeholder={fetchReadUserResponse.gender} />
                  ) : (
                    <span className="profilePage__user-informations-container-fieldset-value">{fetchReadUserResponse.gender}</span>
                  )}
                </fieldset>
              </div>
            </div>
            {(localStorage.getItem("userId") && localStorage.getItem("userId") === userId) && <div className="profilePage__user-informations-private">
              <div className="profilePage__user-informations-container">
                <fieldset className="profilePage__user-informations-container-fieldset">
                  <label className="profilePage__user-informations-container-fieldset-label" htmlFor="email">Email</label>
                  {edit ? (
                    <input type="email" className="profilePage__user-informations-container-fieldset-input" onChange={(event) => onChangeInput(event, 'email')} placeholder={fetchReadUserResponse.email} />
                  ) : (
                    <span className="profilePage__user-informations-container-fieldset-value">{fetchReadUserResponse.email}</span>
                  )}
                </fieldset>
              </div>
              {edit && (
                <div className="profilePage__user-informations-container">
                  <fieldset className="profilePage__user-informations-container-fieldset">
                    <label className="profilePage__user-informations-container-fieldset-label" htmlFor="password1">Last Password</label>
                    <input type="password" className="profilePage__user-informations-container-fieldset-input" placeholder='••••••••' autoComplete='new-password' />
                  </fieldset>
                </div>
              )}
              {edit && (
                <div className="profilePage__user-informations-container">
                  <fieldset className="profilePage__user-informations-container-fieldset">
                    <label className="profilePage__user-informations-container-fieldset-label" htmlFor="password1">New Password</label>
                    <input type="password" className="profilePage__user-informations-container-fieldset-input" placeholder='••••••••' autoComplete='new-password' />
                  </fieldset>
                  <fieldset className="profilePage__user-informations-container-fieldset">
                    <label className="profilePage__user-informations-container-fieldset-label" htmlFor="password1">Confirm</label>
                    <input type="password" className="profilePage__user-informations-container-fieldset-input" placeholder='••••••••' autoComplete='new-password' />
                  </fieldset>
                </div>
              )}
            </div>}
          </div>
          {localStorage.getItem("userId") && localStorage.getItem("userId") === userId && (
            <div style={{ marginLeft: 'auto' }}>
              {edit ? (
                <div>
                  <button className="profilePage__user-editButton" type="button" onClick={handleEdit}>Cancel <FaTimes /></button>
                  <button className="profilePage__user-editButton" type="submit">Save <FaSave /></button>
                </div>
              ) : (
                <div>
                  <button className="profilePage__user-editButton" type="button" onClick={handleEdit}>Edit <FaEdit /></button>
                  <br />
                  <button className="profilePage__user-editButton" type="button" onClick={handleDelete} style={{ background: 'red', color: '#fff', fontWeight: 'bold', padding: '0.5em' }}>DELETE <FaTrash /></button>
                </div>
              )}
            </div>
          )}
        </form>
      )}
      <h2 className="profilePage-title" style={{ marginTop: '1em' }}>Categories</h2>
      <div className="profilePage__categories">
        <Link
          to="/movies"
          className="profilePage__categories-item"
        >
          <span className="profilePage__categories-item-name">Movies</span>
          <span className="profilePage__categories-item-number">9</span>
        </Link>
        <Link
          to="/series"
          className="profilePage__categories-item"
        >
          <span className="profilePage__categories-item-name">Series</span>
          <span className="profilePage__categories-item-number">6</span>
        </Link>
        <Link
          to="/books"
          className="profilePage__categories-item"
        >
          <span className="profilePage__categories-item-name">Books</span>
          <span className="profilePage__categories-item-number">6</span>
        </Link>
        <Link
          to="/video-games"
          className="profilePage__categories-item"
        >
          <span className="profilePage__categories-item-name">Video games</span>
          <span className="profilePage__categories-item-number">0</span>
        </Link>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  
};

export default ProfilePage;
