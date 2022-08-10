export const TOGGLE_EDIT_PROFILE = 'TOGGLE_EDIT_PROFILE';

export const toggleEditProfile = () => ({
  type: TOGGLE_EDIT_PROFILE,
});

export const CHANGE_INPUT_VALUE_PROFILE = 'CHANGE_INPUT_VALUE_PROFILE';

export const changeInputValueProfile = (stateName, value) => ({
  type: CHANGE_INPUT_VALUE_PROFILE,
  stateName,
  value,
});