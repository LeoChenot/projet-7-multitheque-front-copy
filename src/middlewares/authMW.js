import axios from "axios";
import { LOGIN, logout, LOGOUT } from "../actions/login";
import { setFetchRegisterResponseCode } from "../actions/register";
import { fetchReadUser, FETCH_CREATE_USER, FETCH_DELETE_USER, FETCH_READ_USER, FETCH_UPDATE_USER, saveFetchReadUserResponse, saveUserData, setFetchCreateUserLoading, setFetchReadUserLoading } from "../actions/user";

const instance = axios.create({
  baseURL: 'https://collectio-app.herokuapp.com',
  // baseURL: 'http://localhost:4200',
});

const setInstanceAuthorization = () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common.authorization = token;
    console.log(instance.defaults.headers.common);
  }
}
setInstanceAuthorization();

const defaultTimeout = 500;

const authMW = (store) => (next) => async (action) => {
  if (action.type === LOGIN) {
    const state = store.getState();

    try {
      const response = await instance.post('/api/login', {
        email: state.login.email,
        password: state.login.password,
      });
      store.dispatch(saveUserData(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      setInstanceAuthorization();
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_CREATE_USER) {
    const state = store.getState();
    store.dispatch(setFetchCreateUserLoading(true));
    try {
      const response = await instance.post('/api/register', {
        email: state.register.email,
        password: state.register.password1,
        username: state.register.username,
        firstName: state.register.firstName,
        lastName: state.register.lastName,
      });
      store.dispatch(setFetchRegisterResponseCode(response.status));
      setTimeout(() => {
        store.dispatch(setFetchCreateUserLoading(false));
      }, defaultTimeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_READ_USER) {
    const state = store.getState();
    store.dispatch(setFetchReadUserLoading(true));
    try {
      const response = await instance.get(`/api/profile/${state.user.userId}`);
      store.dispatch(saveFetchReadUserResponse(response.data));
      setTimeout(() => {
        store.dispatch(setFetchReadUserLoading(false));
      }, defaultTimeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_UPDATE_USER) {
    const state = store.getState();
    try {
      console.log('Données envoyées :', state.user.fetchReadUserResponse);
      const response = await instance.patch(`/api/profile/${state.user.userId}`, {
        bio: state.user.fetchReadUserResponse.bio,
        email: state.user.fetchReadUserResponse.email,
        firstname: state.user.fetchReadUserResponse.firstname,
        gender: state.user.fetchReadUserResponse.gender,
        lastname: state.user.fetchReadUserResponse.lastname,
        pictureurl: state.user.fetchReadUserResponse.pictureurl,
        username: state.user.fetchReadUserResponse.username,
      });
      console.log(response);
      if (response.status === 200) {
        store.dispatch(fetchReadUser());
      }
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_DELETE_USER) {
    const state = store.getState();
    try {
      const response = await instance.delete(`/api/profile/${state.user.userId}`);
      store.dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === LOGOUT) {
    delete instance.defaults.headers.common.authorization;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  next(action);
}

export default authMW;