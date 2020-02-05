import { SERVICE_KEY } from '../consts';
import {
  // PLOP ACTION IMPORTS PLACEHOLDER
  GET_INIT_PROD_ISSUES_DATA,
  SET_INIT_PROD_ISSUES_DATA,
  SET_ISSUES_PROD_RESPONSE,
  NOTIFY_ISSUES_PROD_CHANGES,
  GET_INIT_PROD_MP_DATA,
  SET_INIT_PROD_MP_DATA,
  SET_MP_PROD_RESPONSE,
  NOTIFY_MP_PROD_CHANGES,
  GET_INIT_PROD_API_GATEWAY_DATA,
  SET_INIT_PROD_API_GATEWAY_DATA,
  SET_API_GATEWAY_PROD_RESPONSE,
  NOTIFY_API_GATEWAY_PROD_CHANGES,
  GET_INIT_PROD_ACL_DATA,
  SET_INIT_PROD_ACL_DATA,
  SET_ACL_PROD_RESPONSE,
  NOTIFY_ACL_PROD_CHANGES,
  GET_INIT_PROD_API_DATA,
  SET_INIT_PROD_API_DATA,
  SET_API_PROD_RESPONSE,
  NOTIFY_API_PROD_CHANGES,
  ESTABLISH_CONNECTION,
  CLOSE_CONNECTION,
  SHOW_NOTIFICATION,
} from './actionTypes';

export const establishConnectionAction = () => ({
  type: ESTABLISH_CONNECTION,
});

export const closeConnectionAction = () => ({
  type: CLOSE_CONNECTION,
});

export const showNotificationAction = payload => ({
  type: SHOW_NOTIFICATION,
  payload,
});

export const setResponseAction = (env, serviceKey, payload) => {
  const actionMapper = {
    prod: {
      // PLOP SET_RESPONSE PROD PLACEHOLDER
      [SERVICE_KEY.ISSUES]: SET_ISSUES_PROD_RESPONSE,

      [SERVICE_KEY.MARKETPLACE]: SET_MP_PROD_RESPONSE,
      [SERVICE_KEY.API_GATEWAY]: SET_API_GATEWAY_PROD_RESPONSE,
      [SERVICE_KEY.ACL]: SET_ACL_PROD_RESPONSE,
      [SERVICE_KEY.API]: SET_API_PROD_RESPONSE,
    },
    stage: {
      // PLOP SET_RESPONSE STAGE PLACEHOLDER
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
      // PLOP GET_INIT_DATA PROD PLACEHOLDER
      [SERVICE_KEY.ISSUES]: GET_INIT_PROD_ISSUES_DATA,

      [SERVICE_KEY.MARKETPLACE]: GET_INIT_PROD_MP_DATA,
      [SERVICE_KEY.API_GATEWAY]: GET_INIT_PROD_API_GATEWAY_DATA,
      [SERVICE_KEY.ACL]: GET_INIT_PROD_ACL_DATA,
      [SERVICE_KEY.API]: GET_INIT_PROD_API_DATA,
    },
    stage: {
      // PLOP GET_INIT_DATA STAGE PLACEHOLDER
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
      // PLOP SET_INIT_DATA PROD PLACEHOLDER
      [SERVICE_KEY.ISSUES]: SET_INIT_PROD_ISSUES_DATA,

      [SERVICE_KEY.MARKETPLACE]: SET_INIT_PROD_MP_DATA,
      [SERVICE_KEY.API_GATEWAY]: SET_INIT_PROD_API_GATEWAY_DATA,
      [SERVICE_KEY.ACL]: SET_INIT_PROD_ACL_DATA,
      [SERVICE_KEY.API]: SET_INIT_PROD_API_DATA,
    },
    stage: {
      // PLOP SET_INIT_DATA STAGE PLACEHOLDER
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
      // PLOP NOTIFY_CHANGES PROD PLACEHOLDER
      [SERVICE_KEY.ISSUES]: NOTIFY_ISSUES_PROD_CHANGES,

      [SERVICE_KEY.MARKETPLACE]: NOTIFY_MP_PROD_CHANGES,
      [SERVICE_KEY.API_GATEWAY]: NOTIFY_API_GATEWAY_PROD_CHANGES,
      [SERVICE_KEY.ACL]: NOTIFY_ACL_PROD_CHANGES,
      [SERVICE_KEY.API]: NOTIFY_API_PROD_CHANGES,
    },
    stage: {
      // PLOP NOTIFY_CHANGES STAGE PLACEHOLDER
    },
  };

  return {
    type: actionMapper[env][serviceKey],
    payload,
  };
};
