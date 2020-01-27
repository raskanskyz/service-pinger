import {
  START_MP_PROD_LISTEN,
  START_OD_PROD_LISTEN,
  ESTABLISH_CONNECTION,
  SET_OD_PROD_RESPONSE,
  SET_MP_PROD_RESPONSE,
  CLOSE_CONNECTION,
  NOTIFY_MP_PROD_CHANGES,
  NOTIFY_OD_PROD_CHANGES,
} from './actionTypes';

export const establishConnectionAction = () => ({
  type: ESTABLISH_CONNECTION,
});

export const closeConnectionAction = () => ({
  type: CLOSE_CONNECTION,
});

export const startMPProdListenAction = () => ({
  type: START_MP_PROD_LISTEN,
});

export const startODProdListenAction = () => ({
  type: START_OD_PROD_LISTEN,
});

export const setODProdResponseAction = payload => ({
  type: SET_OD_PROD_RESPONSE,
  payload,
});

export const setMPProdResponseAction = payload => ({
  type: SET_MP_PROD_RESPONSE,
  payload,
});

export const notifyMPProdChangesAction = payload => ({
  type: NOTIFY_MP_PROD_CHANGES,
  payload,
});

export const notifyODProdChangesAction = payload => ({
  type: NOTIFY_OD_PROD_CHANGES,
  payload,
});
