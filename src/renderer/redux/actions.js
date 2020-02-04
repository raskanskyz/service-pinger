import { SERVICE_KEY } from '../consts';
import {
  // PLOP ACTION IMPORTS PLACEHOLDER
  GET_INIT_PROD_MP_DATA,
  SET_INIT_PROD_MP_DATA,
  SET_MP_PROD_RESPONSE,
  NOTIFY_MP_PROD_CHANGES,
  GET_INIT_PROD_API_GATEWAY_DATA,
  SET_INIT_PROD_API_GATEWAY_DATA,
  SET_API_GATEWAY_PROD_RESPONSE,
  NOTIFY_API_GATEWAY_PROD_CHANGES,
  GET_INIT_PROD_ORG_DASHBOARD_DATA,
  SET_INIT_PROD_ORG_DASHBOARD_DATA,
  SET_ORG_DASHBOARD_PROD_RESPONSE,
  NOTIFY_ORG_DASHBOARD_PROD_CHANGES,
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
      [SERVICE_KEY.ORG_DASHBOARD]: SET_ORG_DASHBOARD_PROD_RESPONSE,
      [SERVICE_KEY.ACL]: SET_ACL_PROD_RESPONSE,
      [SERVICE_KEY.API]: SET_API_PROD_RESPONSE,
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
      [SERVICE_KEY.ORG_DASHBOARD]: GET_INIT_PROD_ORG_DASHBOARD_DATA,
      [SERVICE_KEY.ACL]: GET_INIT_PROD_ACL_DATA,
      [SERVICE_KEY.API]: GET_INIT_PROD_API_DATA,
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
      [SERVICE_KEY.ORG_DASHBOARD]: SET_INIT_PROD_ORG_DASHBOARD_DATA,
      [SERVICE_KEY.ACL]: SET_INIT_PROD_ACL_DATA,
      [SERVICE_KEY.API]: SET_INIT_PROD_API_DATA,
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
      [SERVICE_KEY.ORG_DASHBOARD]: NOTIFY_ORG_DASHBOARD_PROD_CHANGES,
      [SERVICE_KEY.ACL]: NOTIFY_ACL_PROD_CHANGES,
      [SERVICE_KEY.API]: NOTIFY_API_PROD_CHANGES,
    },
    stage: {

    },
  };

  return {
    type: actionMapper[env][serviceKey],
    payload,
  };
};
