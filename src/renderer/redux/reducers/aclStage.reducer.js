import initialState from './initialState';
import { SET_ACL_STAGE_RESPONSE, NOTIFY_ACL_STAGE_CHANGES } from '../actionTypes';

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_ACL_STAGE_RESPONSE:
      return { ...state, ...action.payload };
    case NOTIFY_ACL_STAGE_CHANGES:
      return { ...state, notifyChanges: action.payload.notifyChanges };
    default:
      return state;
  }
};
