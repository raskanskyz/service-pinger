import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, switchMap, map, tap, take,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_MP_DATA, SET_INIT_PROD_MP_DATA,
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

const startMPProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_MP_DATA),
  switchMap(() => fromEvent(socket, '[prod] mp-client pong')),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyMPProdChangesSelector(state), mpProdStatusSelector(state)]),
  tap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      const title = message.status ? 'Marketplace Is Back Up!' : 'Marketplace Is Down';
      new Notification(title); // eslint-disable-line no-new
    }
  }),
  map(([message]) => setMPProdResponseAction(message)),
);

export default [getInitProdMPData, establishConnection, closeConnection, startMPProdListen];
