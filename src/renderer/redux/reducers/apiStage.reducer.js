import initialState from './initialState';
import { SET_API_STAGE_RESPONSE, NOTIFY_API_STAGE_CHANGES } from '../actionTypes';

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_API_STAGE_RESPONSE:
      return { ...state, ...action.payload };
    case NOTIFY_API_STAGE_CHANGES:
      return { ...state, notifyChanges: action.payload };
    default:
      return state;
  }
};
