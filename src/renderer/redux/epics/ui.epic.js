import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {
  tap, ignoreElements, concatMap, map,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION,
  SHOW_NOTIFICATION,
  NOTIFY_API_STAGE_CHANGES,
  NOTIFY_ISSUES_PROD_CHANGES,
  NOTIFY_MP_PROD_CHANGES,
  NOTIFY_API_GATEWAY_PROD_CHANGES,
  NOTIFY_ACL_PROD_CHANGES,
  NOTIFY_API_PROD_CHANGES,
  NOTIFY_BILLING_PROD_CHANGES,
  NOTIFY_ECH_PROD_CHANGES,
} from '../actionTypes';

import { notifyChangesAction } from '../actions';

const showNotification = action$ => action$.pipe(
  ofType(SHOW_NOTIFICATION),
  tap(({ payload }) => {
    const title = `${payload.serviceName} ${payload.status ? 'Is Back Up!' : 'Is Down!'}`;
    // eslint-disable-next-line no-new
    new Notification(title, {
      ...(payload.downtimeDuration && { body: `service has been down for approx. ${payload.downtimeDuration} seconds` }),
    }); // eslint-disable-line no-new
  }),
  ignoreElements(),
);

// TODO: ADD PLOP FOR NEW ENTITIES
const notifyChangesToggled = action$ => action$.pipe(
  ofType(
    NOTIFY_ECH_PROD_CHANGES,
    NOTIFY_API_STAGE_CHANGES,
    NOTIFY_ISSUES_PROD_CHANGES,
    NOTIFY_MP_PROD_CHANGES,
    NOTIFY_API_GATEWAY_PROD_CHANGES,
    NOTIFY_ACL_PROD_CHANGES,
    NOTIFY_API_PROD_CHANGES,
    NOTIFY_BILLING_PROD_CHANGES,
  ),
  tap(({ payload }) => {
    const { envKey, serviceKey, notifyChanges } = payload;
    const currentToggles = JSON.parse(window.localStorage.getItem('notification_toggles') || '{}');

    window.localStorage.setItem('notification_toggles', JSON.stringify({ ...currentToggles, [`${serviceKey}_${envKey}`]: notifyChanges }));
  }),
  ignoreElements(),
);

const loadNotificationToggles = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  map(() => {
    const currentToggles = JSON.parse(window.localStorage.getItem('notification_toggles') || '{}');

    return Object.keys(currentToggles).reduce((acc, nextToggleKey) => {
      const [serviceKey, envKey] = nextToggleKey.split('_');

      return [...acc, notifyChangesAction(envKey, serviceKey, currentToggles[nextToggleKey])];
    }, []);
  }),
  concatMap(currentTogglesActions => of(...currentTogglesActions)),
);

export default [showNotification, notifyChangesToggled, loadNotificationToggles];
