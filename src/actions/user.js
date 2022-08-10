export const SET_FETCH_CREATE_USER_LOADING = 'SET_FETCH_CREATE_USER_LOADING';
export const SET_FETCH_READ_USER_LOADING = 'SET_FETCH_READ_USER_LOADING';
export const SET_FETCH_UPDATE_USER_LOADING = 'SET_FETCH_UPDATE_USER_LOADING';
export const SET_FETCH_DELETE_USER_LOADING = 'SET_FETCH_DELETE_USER_LOADING';

export const setFetchCreateUserLoading = (newFetchCreateUserLoading) => ({
  type: SET_FETCH_CREATE_USER_LOADING,
  newFetchCreateUserLoading,
});

export const setFetchReadUserLoading = (newFetchReadUserLoading) => ({
  type: SET_FETCH_READ_USER_LOADING,
  newFetchReadUserLoading,
});

export const setFetchUpdateUserLoading = (newFetchUpdateUserLoading) => ({
  type: SET_FETCH_UPDATE_USER_LOADING,
  newFetchUpdateUserLoading,
});

export const setFetchDeleteUserLoading = (newFetchDeleteUserLoading) => ({
  type: SET_FETCH_DELETE_USER_LOADING,
  newFetchDeleteUserLoading,
});

export const FETCH_CREATE_USER = 'FETCH_CREATE_USER';
export const FETCH_READ_USER = 'FETCH_READ_USER';
export const FETCH_UPDATE_USER = 'FETCH_UPDATE_USER';
export const FETCH_DELETE_USER = 'FETCH_DELETE_USER';

export const fetchCreateUser = () => ({
  type: FETCH_CREATE_USER,
});

export const fetchReadUser = () => ({
  type: FETCH_READ_USER,
});

export const fetchUpdateUser = () => ({
  type: FETCH_UPDATE_USER,
});

export const fetchDeleteUser = () => ({
  type: FETCH_DELETE_USER,
});

export const SAVE_FETCH_CREATE_USER_RESPONSE = 'SAVE_FETCH_CREATE_USER_RESPONSE';
export const SAVE_FETCH_READ_USER_RESPONSE = 'SAVE_FETCH_READ_USER_RESPONSE';
export const SAVE_FETCH_UPDATE_USER_RESPONSE = 'SAVE_FETCH_UPDATE_USER_RESPONSE';
export const SAVE_FETCH_DELETE_USER_RESPONSE = 'SAVE_FETCH_DELETE_USER_RESPONSE';

export const saveFetchCreateUserResponse = (newFetchCreateUserResponse) => ({
  type: SAVE_FETCH_CREATE_USER_RESPONSE,
  newFetchCreateUserResponse,
});

export const saveFetchReadUserResponse = (newFetchReadUserResponse) => ({
  type: SAVE_FETCH_READ_USER_RESPONSE,
  newFetchReadUserResponse,
});

export const saveFetchUpdateUserResponse = (newFetchUpdateUserResponse) => ({
  type: SAVE_FETCH_UPDATE_USER_RESPONSE,
  newFetchUpdateUserResponse,
});

export const saveFetchDeleteUserResponse = (newFetchDeleteUserResponse) => ({
  type: SAVE_FETCH_DELETE_USER_RESPONSE,
  newFetchDeleteUserResponse,
});


export const CHANGE_FETCH_READ_USER_RESPONSE = 'CHANGE_FETCH_READ_USER_RESPONSE';
export const changeFetchReadUserResponse = (stateName, value) => ({
  type: CHANGE_FETCH_READ_USER_RESPONSE,
  stateName,
  value,
});







export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const saveUserData = ({ userId }) => ({
  type: SAVE_USER_DATA,
  userId,
});