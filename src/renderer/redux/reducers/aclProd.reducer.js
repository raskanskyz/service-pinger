import initialState from './initialState';
import { SET_ACL_PROD_RESPONSE, NOTIFY_ACL_PROD_CHANGES, SET_INIT_PROD_ACL_DATA } from '../actionTypes';

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_INIT_PROD_ACL_DATA:
      return { ...state, pingHistory: action.payload };
    case SET_ACL_PROD_RESPONSE:
      return { ...state, ...action.payload };
    case NOTIFY_ACL_PROD_CHANGES:
      return { ...state, notifyChanges: action.payload };
    default:
      return state;
  }
};
