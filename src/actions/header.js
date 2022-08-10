export const CHANGE_INPUT_VALUE_HEADER = 'CHANGE_INPUT_VALUE_HEADER';

export const changeInputValueHeader = (stateName, value) => ({
  type: CHANGE_INPUT_VALUE_HEADER,
  stateName,
  value,
});
