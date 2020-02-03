import initialState from './initialState';
import { SET_ORG_DASHBOARD_PROD_RESPONSE, NOTIFY_ORG_DASHBOARD_PROD_CHANGES } from '../actionTypes';

export default (state = { ...initialState }, action) => {
  switch (action.type) {
  
    case SET_ORG_DASHBOARD_PROD_RESPONSE:
      return { ...state, ...action.payload };
    case NOTIFY_ORG_DASHBOARD_PROD_CHANGES:
      return { ...state, notifyChanges: action.payload };
    default:
      return state;
  }
};
