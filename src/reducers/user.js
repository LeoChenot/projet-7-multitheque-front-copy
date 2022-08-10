import { LOGOUT } from "../actions/login";
import {
  SAVE_USER_DATA,

  SET_FETCH_CREATE_USER_LOADING,
  SET_FETCH_READ_USER_LOADING,
  SET_FETCH_UPDATE_USER_LOADING,
  SET_FETCH_DELETE_USER_LOADING,
  SAVE_FETCH_CREATE_USER_RESPONSE,
  SAVE_FETCH_READ_USER_RESPONSE,
  SAVE_FETCH_UPDATE_USER_RESPONSE,
  SAVE_FETCH_DELETE_USER_RESPONSE,
  CHANGE_FETCH_READ_USER_RESPONSE,
} from "../actions/user";

const initialState = {
  auth: localStorage.getItem('token') ? true : false,
  userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : undefined,

  fetchCreateUserLoading: true,
  fetchReadUserLoading: true,
  fetchUpdateUserLoading: true,
  fetchDeleteUserLoading: true,

  fetchCreateUserResponse: undefined,
  fetchReadUserResponse: undefined,
  fetchUpdateUserResponse: undefined,
  fetchDeleteUserResponse: undefined,



};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FETCH_CREATE_USER_LOADING: {
      return {
        ...state,
        fetchCreateUserLoading: action.newFetchCreateUserLoading,
      }
    }
    case SET_FETCH_READ_USER_LOADING: {
      return {
        ...state,
        fetchReadUserLoading: action.newFetchReadUserLoading,
      }
    }
    case SET_FETCH_UPDATE_USER_LOADING: {
      return {
        ...state,
        fetchUpdateUserLoading: action.newFetchUpdateUserLoading,
      }
    }
    case SET_FETCH_DELETE_USER_LOADING: {
      return {
        ...state,
        fetchDeleteUserLoading: action.newFetchDeleteUserLoading,
      }
    }

    // ---------------------

    case SAVE_FETCH_CREATE_USER_RESPONSE: {
      return {
        ...state,
        fetchCreateUserResponse: action.newFetchCreateUserResponse,
      }
    }
    case SAVE_FETCH_READ_USER_RESPONSE: {
      return {
        ...state,
        fetchReadUserResponse: action.newFetchReadUserResponse,
      }
    }
    case SAVE_FETCH_UPDATE_USER_RESPONSE: {
      return {
        ...state,
        fetchUpdateUserResponse: action.newFetchUpdateUserResponse,
      }
    }
    case SAVE_FETCH_DELETE_USER_RESPONSE: {
      return {
        ...state,
        fetchDeleteUserResponse: action.newFetchDeleteUserResponse,
      }
    }

    case CHANGE_FETCH_READ_USER_RESPONSE: {
      return {
        ...state,
        fetchReadUserResponse: {
          ...state.fetchReadUserResponse,
          [action.stateName]: action.value,
        }
      }
    }











    case SAVE_USER_DATA: {
      return {
        ...state,
        auth: true,
        userId: action.userId,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        auth: false,
        userId: undefined,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;