import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_MP_DATA, SET_INIT_PROD_MP_DATA,
} from '../actionTypes';
import { notifyMPProdChangesSelector, mpProdStatusSelector } from '../selectors/mpProd.selectors';
import {
  getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction,
} from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io('http://localhost:3000', { transports: ['websocket'] });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.MARKETPLACE)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdMPData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_MP_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.MARKETPLACE, message)),
);

const startMPProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_MP_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.MARKETPLACE} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyMPProdChangesSelector(state), mpProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Marketplace', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.MARKETPLACE, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.MARKETPLACE, message));
  }),
);

export default [getInitProdMPData, establishConnection, closeConnection, startMPProdListen];
