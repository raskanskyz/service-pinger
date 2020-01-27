import {
  SET_MP_PROD_RESPONSE, SET_OD_PROD_RESPONSE, NOTIFY_MP_PROD_CHANGES, NOTIFY_OD_PROD_CHANGES,
} from '../actionTypes';

const initialStruct = {
  status: null,
  version: null,
  notifyChanges: true,
  failedAttempts: 0,
};

const initialState = {
  mp: { ...initialStruct },
  od: { ...initialStruct },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MP_PROD_RESPONSE:
      return { ...state, mp: { ...state.mp, ...action.payload } };
    case SET_OD_PROD_RESPONSE:
      return { ...state, od: { ...state.od, ...action.payload } };
    case NOTIFY_MP_PROD_CHANGES:
      return { ...state, mp: { ...state.mp, notifyChanges: action.payload } };
    case NOTIFY_OD_PROD_CHANGES:
      return { ...state, od: { ...state.od, notifyChanges: action.payload } };
    default:
      return state;
  }
};
