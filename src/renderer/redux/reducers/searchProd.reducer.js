import initialState from './initialState';
import { SET_SEARCH_PROD_RESPONSE, NOTIFY_SEARCH_PROD_CHANGES } from '../actionTypes';

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_SEARCH_PROD_RESPONSE:
      return { ...state, ...action.payload };
    case NOTIFY_SEARCH_PROD_CHANGES:
      return { ...state, notifyChanges: action.payload.notifyChanges };
    default:
      return state;
  }
};
