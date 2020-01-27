import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, filter, switchMap, take, map, tap, ignoreElements,
} from 'rxjs/operators';

import {
  START_MP_PROD_LISTEN, START_OD_PROD_LISTEN, ESTABLISH_CONNECTION, CLOSE_CONNECTION, SET_MP_PROD_RESPONSE,
} from '../actionTypes';
import { notifyMPProdChangesSelector, mpProdStatusSelector } from '../selectors/prod';
import {
  startMPProdListenAction, startODProdListenAction, setMPProdResponseAction, setODProdResponseAction,
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
  switchMap(() => fromEvent(socket, '[prod] mp-client')),
  map(message => setMPProdResponseAction(message)),
);

const startODProdListen = action$ => action$.pipe(
  ofType(START_OD_PROD_LISTEN),
  switchMap(() => fromEvent(socket, '[prod] org')),
  map(message => setODProdResponseAction(message)),
);

const setMPProdResponse = (action$, state$) => action$.pipe(
  ofType(SET_MP_PROD_RESPONSE),
  withLatestFrom(state$),
  map(([action, state]) => [action.payload.status, notifyMPProdChangesSelector(state), mpProdStatusSelector(state)]),
  filter(([currentServiceStatus, notifyChanges, prevServiceStatus]) => notifyChanges && prevServiceStatus !== currentServiceStatus),
  tap(([currentServiceStatus]) => {
    const title = currentServiceStatus ? 'Marketplace Is Back Up!' : 'Marketplace Is Down';
    const myNotification = new Notification(title, {
      body: 'Lorem Ipsum Dolor Sit Amet',
    });

    // myNotification.onclick = () => {
    //   console.log('Notification clicked');
    // };
  }),
  ignoreElements(),
);

const setODProdResponse = (action$, state$) => action$.pipe(
  ofType(SET_MP_PROD_RESPONSE),
  withLatestFrom(state$),
  map(([action, state]) => [action.payload.status, notifyMPProdChangesSelector(state), mpProdStatusSelector(state)]),
  filter(([currentServiceStatus, notifyChanges, prevServiceStatus]) => {
    console.log('RapidLogs: prevServiceStatus', prevServiceStatus);
    console.log('RapidLogs: currentServiceStatus', currentServiceStatus);
    console.log('RapidLogs: notifyChanges', notifyChanges);
    return notifyChanges && prevServiceStatus !== currentServiceStatus;
  }),
  tap(([currentServiceStatus]) => {
    const title = currentServiceStatus ? 'Organization Dashboard Is Back Up!' : 'Organization Dashboard Is Down';
    const myNotification = new Notification(title, {
      body: 'Lorem Ipsum Dolor Sit Amet',
    });

    // myNotification.onclick = () => {
    //   console.log('Notification clicked');
    // };
  }),
  ignoreElements(),
);

export default [
  establishConnection, closeConnection, startMPProdListen, startODProdListen, setMPProdResponse, setODProdResponse,
];
