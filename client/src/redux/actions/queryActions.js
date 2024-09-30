// actions/queryActions.js
export const SET_QUERY = 'SET_QUERY';
export const GET_ALL_QUERIES = 'GET_ALL_QUERIES';
export const SET_CURRENT_QUERY = 'SET_CURRENT_QUERY';

export const getAllQueries = (query) => ({
  type: GET_ALL_QUERIES,
  payload: query,
});

export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: query,
});

export const setCurrentQuery = (query) => ({
  type: SET_CURRENT_QUERY,
  payload: query,
});
