import { SET_MP_PROD_RESPONSE, NOTIFY_MP_PROD_CHANGES, SET_INIT_PROD_MP_DATA } from '../actionTypes';

const initialState = {
  status: null,
  version: null,
  notifyChanges: true,
  failedAttempts: 0,
  pingHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT_PROD_MP_DATA:
      return { ...state, pingHistory: action.payload };
    case SET_MP_PROD_RESPONSE:
      return { ...state, ...action.payload, pingHistory: [...state.pingHistory, action.payload.status] };
    case NOTIFY_MP_PROD_CHANGES:
      return { ...state, notifyChanges: action.payload };
    default:
      return state;
  }
};
