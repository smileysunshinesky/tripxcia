import { SET_QUERY, SET_CURRENT_QUERY } from '../actions/queryActions';

const initialState = {
  type: '',
  query: '',
  currentQuery: null,
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        ...action.payload, // Update the state with the new query object
      };
    case SET_CURRENT_QUERY:
      return {
        ...state,
        currentQuery: action.payload,
      };
    default:
      return state;
  }
};

export default queryReducer;
