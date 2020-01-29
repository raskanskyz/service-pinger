import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, filter, switchMap, map, tap, ignoreElements,
} from 'rxjs/operators';

import {
  START_MP_PROD_LISTEN, START_OD_PROD_LISTEN, ESTABLISH_CONNECTION, CLOSE_CONNECTION, SET_MP_PROD_RESPONSE, SET_OD_PROD_RESPONSE,
} from '../actionTypes';
import {
  notifyMPProdChangesSelector, mpProdStatusSelector, notifyODProdChangesSelector, odProdStatusSelector,
} from '../selectors/prod';
import {
  startMPProdListenAction, startODProdListenAction, setMPProdResponseAction, setODProdResponseAction, closeConnectionAction,
} from '../actions';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io('http://localhost:3000', { transports: ['websocket'] });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [startMPProdListenAction(), startODProdListenAction()]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const startMPProdListen = action$ => action$.pipe(
  ofType(START_MP_PROD_LISTEN),
  tap(() => socket.emit('init', { env: 'prod', serviceKey: 'mp-client' })),
  switchMap(() => fromEvent(socket, '[prod] mp-client init')),
  tap(console.log),
  switchMap(() => fromEvent(socket, '[prod] mp-client')),
  tap(console.log),
  map(message => setMPProdResponseAction(message)),
);

const startODProdListen = action$ => action$.pipe(
  ofType(START_OD_PROD_LISTEN),
  switchMap(() => fromEvent(socket, '[prod] org')),
  tap(console.log),
  map(message => setODProdResponseAction(message)),
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

const setODProdResponse = (action$, state$) => action$.pipe(
  ofType(SET_OD_PROD_RESPONSE),
  withLatestFrom(state$),
  map(([action, state]) => [action.payload.status, notifyODProdChangesSelector(state), odProdStatusSelector(state)]),
  filter(([currentServiceStatus, notifyChanges, prevServiceStatus]) => notifyChanges && prevServiceStatus !== null && prevServiceStatus !== currentServiceStatus),
  tap(([currentServiceStatus]) => {
    const title = currentServiceStatus ? 'Organization Dashboard Is Back Up!' : 'Organization Dashboard Is Down';
    new Notification(title); // eslint-disable-line no-new

    // FOR REFERENCE
    // myNotification.onclick = () => {
    //   console.log('Notification clicked');
    // };
  }),
  ignoreElements(),
);

export default [establishConnection, closeConnection, startMPProdListen, startODProdListen, setMPProdResponse, setODProdResponse];
