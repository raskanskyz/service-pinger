import initialState from './initialState';
import { SET_ECH2_STAGE_RESPONSE, NOTIFY_ECH2_STAGE_CHANGES } from '../actionTypes';

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_ECH2_STAGE_RESPONSE:
      return { ...state, ...action.payload };
    case NOTIFY_ECH2_STAGE_CHANGES:
      return { ...state, notifyChanges: action.payload.notifyChanges };
    default:
      return state;
  }
};
