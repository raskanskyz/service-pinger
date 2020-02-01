import { SERVICE_KEY } from '../consts';
import {
  ESTABLISH_CONNECTION,
  SET_MP_PROD_RESPONSE,
  SET_API_GATEWAY_PROD_RESPONSE,
  CLOSE_CONNECTION,
  NOTIFY_MP_PROD_CHANGES,
  NOTIFY_API_GATEWAY_PROD_CHANGES,
  GET_INIT_PROD_MP_DATA,
  GET_INIT_PROD_API_GATEWAY_DATA,
  SET_INIT_PROD_MP_DATA,
  SET_INIT_PROD_API_GATEWAY_DATA,
} from './actionTypes';

export const establishConnectionAction = () => ({
  type: ESTABLISH_CONNECTION,
});

export const closeConnectionAction = () => ({
  type: CLOSE_CONNECTION,
});

export const setResponseAction = (env, serviceKey, payload) => {
  const actionMapper = {
    prod: {
      [SERVICE_KEY.MARKETPLACE]: SET_MP_PROD_RESPONSE,
      [SERVICE_KEY.API_GATEWAY]: SET_API_GATEWAY_PROD_RESPONSE,
    },
    stage: {

    },
  };

  return {
    type: actionMapper[env][serviceKey],
    payload,
  };
};

export const getInitDataAction = (env, serviceKey) => {
  const actionMapper = {
    prod: {
      [SERVICE_KEY.MARKETPLACE]: GET_INIT_PROD_MP_DATA,
      [SERVICE_KEY.API_GATEWAY]: GET_INIT_PROD_API_GATEWAY_DATA,
    },
    stage: {

    },
  };

  return {
    type: actionMapper[env][serviceKey],
    payload: {
      env, serviceKey,
    },
  };
};

export const setInitDataAction = (env, serviceKey, payload) => {
  const actionMapper = {
    prod: {
      [SERVICE_KEY.MARKETPLACE]: SET_INIT_PROD_MP_DATA,
      [SERVICE_KEY.API_GATEWAY]: SET_INIT_PROD_API_GATEWAY_DATA,
    },
    stage: {

    },
  };

  return {
    type: actionMapper[env][serviceKey],
    payload,
  };
};

export const notifyChangesAction = (env, serviceKey, payload) => {
  const actionMapper = {
    prod: {
      [SERVICE_KEY.MARKETPLACE]: NOTIFY_MP_PROD_CHANGES,
      [SERVICE_KEY.API_GATEWAY]: NOTIFY_API_GATEWAY_PROD_CHANGES,
    },
    stage: {

    },
  };

  return {
    type: actionMapper[env][serviceKey],
    payload,
  };
};
