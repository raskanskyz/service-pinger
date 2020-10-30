import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_BILLING_DATA, SET_INIT_PROD_BILLING_DATA,
} from '../actionTypes';
import { notifyBillingProdChangesSelector, billingProdStatusSelector } from '../selectors/billingProd.selectors';
import {
  getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction,
} from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io(process.env.SERVER_ADDRESS, { transports: ['websocket'], path: '/version-tracker/socket.io' });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.BILLING)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdBillingData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_BILLING_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.BILLING, message)),
);

const startBillingProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_BILLING_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.BILLING} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyBillingProdChangesSelector(state), billingProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Billing Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.BILLING, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.BILLING, message));
  }),
);

export default [getInitProdBillingData, establishConnection, closeConnection, startBillingProdListen];
