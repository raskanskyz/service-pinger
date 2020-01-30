import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, filter, switchMap, map, tap, ignoreElements, take,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_MP_DATA, SET_MP_PROD_RESPONSE, SET_INIT_PROD_MP_DATA,
} from '../actionTypes';
import { notifyMPProdChangesSelector, mpProdStatusSelector } from '../selectors/mpProd.selectors';
import { getInitProdMPDataAction, setMPProdResponseAction, setInitProdMPDataAction } from '../actions';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io('http://localhost:3000', { transports: ['websocket'] });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitProdMPDataAction()]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdMPData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_MP_DATA),
  switchMap(() => fromEvent(socket, '[prod] mp-client pingHistory')),
  take(1),
  map(message => setInitProdMPDataAction(message)),
);

const startMPProdListen = action$ => action$.pipe(
  ofType(SET_INIT_PROD_MP_DATA),
  tap(console.log),
  switchMap(() => fromEvent(socket, '[prod] mp-client pong')),
  tap(console.log),
  map(message => setMPProdResponseAction(message)),
);

const setMPProdResponse = (action$, state$) => action$.pipe(
  ofType(SET_MP_PROD_RESPONSE),
  withLatestFrom(state$),
  map(([action, state]) => [action.payload.status, notifyMPProdChangesSelector(state), mpProdStatusSelector(state)]),
  filter(([currentServiceStatus, notifyChanges, prevServiceStatus]) => notifyChanges && prevServiceStatus !== null && prevServiceStatus !== currentServiceStatus),
  tap(([currentServiceStatus]) => {
    const title = currentServiceStatus ? 'Marketplace Is Back Up!' : 'Marketplace Is Down';
    new Notification(title); // eslint-disable-line no-new

    // myNotification.onclick = () => {
    //   console.log('Notification clicked');
    // };
  }),
  ignoreElements(),
);

export default [getInitProdMPData, establishConnection, closeConnection, startMPProdListen, setMPProdResponse];
