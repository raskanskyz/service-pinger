import { SERVICE_KEY } from '../consts';
import {
  // PLOP ACTION IMPORTS PLACEHOLDER
  GET_INIT_STAGE_PROVISIONING_DATA,
  SET_INIT_STAGE_PROVISIONING_DATA,
  SET_PROVISIONING_STAGE_RESPONSE,
  NOTIFY_PROVISIONING_STAGE_CHANGES,
  GET_INIT_STAGE_ACL_V2_DATA,
  SET_INIT_STAGE_ACL_V2_DATA,
  SET_ACL_V2_STAGE_RESPONSE,
  NOTIFY_ACL_V2_STAGE_CHANGES,
  GET_INIT_STAGE_ISSUES_DATA,
  SET_INIT_STAGE_ISSUES_DATA,
  SET_ISSUES_STAGE_RESPONSE,
  NOTIFY_ISSUES_STAGE_CHANGES,
  GET_INIT_PROD_ECH2_DATA,
  SET_INIT_PROD_ECH2_DATA,
  SET_ECH2_PROD_RESPONSE,
  NOTIFY_ECH2_PROD_CHANGES,
  GET_INIT_STAGE_ECH2_DATA,
  SET_INIT_STAGE_ECH2_DATA,
  SET_ECH2_STAGE_RESPONSE,
  NOTIFY_ECH2_STAGE_CHANGES,
  GET_INIT_STAGE_ACL_DATA,
  SET_INIT_STAGE_ACL_DATA,
  SET_ACL_STAGE_RESPONSE,
  NOTIFY_ACL_STAGE_CHANGES,
  GET_INIT_PROD_ROUTER_DATA,
  SET_INIT_PROD_ROUTER_DATA,
  SET_ROUTER_PROD_RESPONSE,
  NOTIFY_ROUTER_PROD_CHANGES,
  GET_INIT_PROD_SEARCH_DATA,
  SET_INIT_PROD_SEARCH_DATA,
  SET_SEARCH_PROD_RESPONSE,
  NOTIFY_SEARCH_PROD_CHANGES,
  GET_INIT_PROD_PROVISIONING_DATA,
  SET_INIT_PROD_PROVISIONING_DATA,
  SET_PROVISIONING_PROD_RESPONSE,
  NOTIFY_PROVISIONING_PROD_CHANGES,
  GET_INIT_PROD_ECH_DATA,
  SET_INIT_PROD_ECH_DATA,
  SET_ECH_PROD_RESPONSE,
  NOTIFY_ECH_PROD_CHANGES,
  GET_INIT_PROD_BILLING_DATA,
  SET_INIT_PROD_BILLING_DATA,
  SET_BILLING_PROD_RESPONSE,
  NOTIFY_BILLING_PROD_CHANGES,
  GET_INIT_STAGE_API_DATA,
  SET_INIT_STAGE_API_DATA,
  SET_API_STAGE_RESPONSE,
  NOTIFY_API_STAGE_CHANGES,
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
      [SERVICE_KEY.ECH2]: SET_ECH2_PROD_RESPONSE,

      [SERVICE_KEY.ROUTER]: SET_ROUTER_PROD_RESPONSE,

      [SERVICE_KEY.ECH2]: SET_ECH2_PROD_RESPONSE,

      [SERVICE_KEY.SEARCH]: SET_SEARCH_PROD_RESPONSE,

      [SERVICE_KEY.PROVISIONING]: SET_PROVISIONING_PROD_RESPONSE,

      [SERVICE_KEY.ECH]: SET_ECH_PROD_RESPONSE,

      [SERVICE_KEY.BILLING]: SET_BILLING_PROD_RESPONSE,

      [SERVICE_KEY.ISSUES]: SET_ISSUES_PROD_RESPONSE,

      [SERVICE_KEY.MARKETPLACE]: SET_MP_PROD_RESPONSE,
      [SERVICE_KEY.API_GATEWAY]: SET_API_GATEWAY_PROD_RESPONSE,
      [SERVICE_KEY.ACL]: SET_ACL_PROD_RESPONSE,
      [SERVICE_KEY.API]: SET_API_PROD_RESPONSE,
    },
    stage: {
      // PLOP SET_RESPONSE STAGE PLACEHOLDER
      [SERVICE_KEY.PROVISIONING]: SET_PROVISIONING_STAGE_RESPONSE,

      [SERVICE_KEY.ACL_V2]: SET_ACL_V2_STAGE_RESPONSE,

      [SERVICE_KEY.ISSUES]: SET_ISSUES_STAGE_RESPONSE,

      [SERVICE_KEY.ECH2]: SET_ECH2_STAGE_RESPONSE,

      [SERVICE_KEY.ACL]: SET_ACL_STAGE_RESPONSE,

      [SERVICE_KEY.API]: SET_API_STAGE_RESPONSE,

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
      [SERVICE_KEY.ECH2]: GET_INIT_PROD_ECH2_DATA,

      [SERVICE_KEY.ROUTER]: GET_INIT_PROD_ROUTER_DATA,

      [SERVICE_KEY.ECH2]: GET_INIT_PROD_ECH2_DATA,

      [SERVICE_KEY.SEARCH]: GET_INIT_PROD_SEARCH_DATA,

      [SERVICE_KEY.PROVISIONING]: GET_INIT_PROD_PROVISIONING_DATA,

      [SERVICE_KEY.ECH]: GET_INIT_PROD_ECH_DATA,

      [SERVICE_KEY.BILLING]: GET_INIT_PROD_BILLING_DATA,

      [SERVICE_KEY.ISSUES]: GET_INIT_PROD_ISSUES_DATA,

      [SERVICE_KEY.MARKETPLACE]: GET_INIT_PROD_MP_DATA,
      [SERVICE_KEY.API_GATEWAY]: GET_INIT_PROD_API_GATEWAY_DATA,
      [SERVICE_KEY.ACL]: GET_INIT_PROD_ACL_DATA,
      [SERVICE_KEY.API]: GET_INIT_PROD_API_DATA,
    },
    stage: {
      // PLOP GET_INIT_DATA STAGE PLACEHOLDER
      [SERVICE_KEY.PROVISIONING]: GET_INIT_STAGE_PROVISIONING_DATA,

      [SERVICE_KEY.ACL_V2]: GET_INIT_STAGE_ACL_V2_DATA,

      [SERVICE_KEY.ISSUES]: GET_INIT_STAGE_ISSUES_DATA,

      [SERVICE_KEY.ECH2]: GET_INIT_STAGE_ECH2_DATA,

      [SERVICE_KEY.ACL]: GET_INIT_STAGE_ACL_DATA,

      [SERVICE_KEY.API]: GET_INIT_STAGE_API_DATA,

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
      [SERVICE_KEY.ECH2]: SET_INIT_PROD_ECH2_DATA,

      [SERVICE_KEY.ROUTER]: SET_INIT_PROD_ROUTER_DATA,

      [SERVICE_KEY.ECH2]: SET_INIT_PROD_ECH2_DATA,

      [SERVICE_KEY.SEARCH]: SET_INIT_PROD_SEARCH_DATA,

      [SERVICE_KEY.PROVISIONING]: SET_INIT_PROD_PROVISIONING_DATA,

      [SERVICE_KEY.ECH]: SET_INIT_PROD_ECH_DATA,

      [SERVICE_KEY.BILLING]: SET_INIT_PROD_BILLING_DATA,

      [SERVICE_KEY.ISSUES]: SET_INIT_PROD_ISSUES_DATA,

      [SERVICE_KEY.MARKETPLACE]: SET_INIT_PROD_MP_DATA,
      [SERVICE_KEY.API_GATEWAY]: SET_INIT_PROD_API_GATEWAY_DATA,
      [SERVICE_KEY.ACL]: SET_INIT_PROD_ACL_DATA,
      [SERVICE_KEY.API]: SET_INIT_PROD_API_DATA,
    },
    stage: {
      // PLOP SET_INIT_DATA STAGE PLACEHOLDER
      [SERVICE_KEY.PROVISIONING]: SET_INIT_STAGE_PROVISIONING_DATA,

      [SERVICE_KEY.ACL_V2]: SET_INIT_STAGE_ACL_V2_DATA,

      [SERVICE_KEY.ISSUES]: SET_INIT_STAGE_ISSUES_DATA,

      [SERVICE_KEY.ECH2]: SET_INIT_STAGE_ECH2_DATA,

      [SERVICE_KEY.ACL]: SET_INIT_STAGE_ACL_DATA,

      [SERVICE_KEY.API]: SET_INIT_STAGE_API_DATA,

    },
  };

  return {
    type: actionMapper[env][serviceKey],
    payload,
  };
};

export const notifyChangesAction = (envKey, serviceKey, payload) => {
  const actionMapper = {
    prod: {
      // PLOP NOTIFY_CHANGES PROD PLACEHOLDER
      [SERVICE_KEY.ECH2]: NOTIFY_ECH2_PROD_CHANGES,

      [SERVICE_KEY.ROUTER]: NOTIFY_ROUTER_PROD_CHANGES,

      [SERVICE_KEY.ECH2]: NOTIFY_ECH2_PROD_CHANGES,

      [SERVICE_KEY.SEARCH]: NOTIFY_SEARCH_PROD_CHANGES,

      [SERVICE_KEY.PROVISIONING]: NOTIFY_PROVISIONING_PROD_CHANGES,

      [SERVICE_KEY.ECH]: NOTIFY_ECH_PROD_CHANGES,

      [SERVICE_KEY.BILLING]: NOTIFY_BILLING_PROD_CHANGES,

      [SERVICE_KEY.ISSUES]: NOTIFY_ISSUES_PROD_CHANGES,

      [SERVICE_KEY.MARKETPLACE]: NOTIFY_MP_PROD_CHANGES,
      [SERVICE_KEY.API_GATEWAY]: NOTIFY_API_GATEWAY_PROD_CHANGES,
      [SERVICE_KEY.ACL]: NOTIFY_ACL_PROD_CHANGES,
      [SERVICE_KEY.API]: NOTIFY_API_PROD_CHANGES,
    },
    stage: {
      // PLOP NOTIFY_CHANGES STAGE PLACEHOLDER
      [SERVICE_KEY.PROVISIONING]: NOTIFY_PROVISIONING_STAGE_CHANGES,

      [SERVICE_KEY.ACL_V2]: NOTIFY_ACL_V2_STAGE_CHANGES,

      [SERVICE_KEY.ISSUES]: NOTIFY_ISSUES_STAGE_CHANGES,

      [SERVICE_KEY.ECH2]: NOTIFY_ECH2_STAGE_CHANGES,

      [SERVICE_KEY.ACL]: NOTIFY_ACL_STAGE_CHANGES,

      [SERVICE_KEY.API]: NOTIFY_API_STAGE_CHANGES,

    },
  };

  return {
    type: actionMapper[envKey][serviceKey],
    payload: {
      envKey,
      serviceKey,
      notifyChanges: payload,
    },
  };
};
