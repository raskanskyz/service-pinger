import { SET_API_PROD_RESPONSE, NOTIFY_API_PROD_CHANGES, SET_INIT_PROD_API_DATA } from '../actionTypes';

const initialState = {
  status: null,
  version: null,
  notifyChanges: true,
  failedAttempts: 0,
  pingHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT_PROD_API_DATA:
      return { ...state, pingHistory: action.payload };
    case SET_API_PROD_RESPONSE:
      return { ...state, ...action.payload, pingHistory: [...state.pingHistory, action.payload.status] };
    case NOTIFY_API_PROD_CHANGES:
      return { ...state, notifyChanges: action.payload };
    default:
      return state;
  }
};
