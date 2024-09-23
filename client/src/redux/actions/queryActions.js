// actions/queryActions.js
export const SET_QUERY = 'SET_QUERY';
export const SET_CURRENT_QUERY = 'SET_CURRENT_QUERY';

export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: query,
});

export const setCurrentQuery = (query) => ({
  type: SET_CURRENT_QUERY,
  payload: query,
});
