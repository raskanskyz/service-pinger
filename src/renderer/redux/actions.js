import {
  START_MP_PROD_LISTEN,
  ESTABLISH_CONNECTION,
  SET_MP_PROD_RESPONSE,
  CLOSE_CONNECTION,
  NOTIFY_MP_PROD_CHANGES,
  GET_INIT_PROD_MP_DATA,
  SET_INIT_PROD_MP_DATA,
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

export const getInitProdMPDataAction = (env, serviceKey) => ({
  type: GET_INIT_PROD_MP_DATA,
  payload: {
    env, serviceKey,
  },
});

export const setInitProdMPDataAction = payload => ({
  type: SET_INIT_PROD_MP_DATA,
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
