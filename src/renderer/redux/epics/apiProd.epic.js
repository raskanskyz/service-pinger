import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, switchMap, map, tap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_API_DATA, SET_INIT_PROD_API_DATA,
} from '../actionTypes';
import { notifyApiProdChangesSelector, apiProdStatusSelector } from '../selectors/apiProd.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction } from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io('http://localhost:3000', { transports: ['websocket'] });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.API)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdApiData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_API_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.API, message)),
);

const startApiProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_API_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.API} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyApiProdChangesSelector(state), apiProdStatusSelector(state)]),
  tap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      const title = message.status ? 'Api Service Is Back Up!' : 'Api Service Is Down';
      new Notification(title); // eslint-disable-line no-new
    }
  }),
  map(([message]) => setResponseAction('prod', SERVICE_KEY.API, message)),
);

export default [getInitProdApiData, establishConnection, closeConnection, startApiProdListen];
