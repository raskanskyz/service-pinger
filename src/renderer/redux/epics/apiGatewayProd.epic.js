import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, switchMap, map, tap, take,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_API_GATEWAY_DATA, SET_INIT_PROD_API_GATEWAY_DATA,
} from '../actionTypes';
import { notifyApiGatewayProdChangesSelector, apiGatewayProdStatusSelector } from '../selectors/apiGatewayProd.selectors';
import { getInitDataAction, setInitDataAction, setResponseAction } from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io('http://localhost:3000', { transports: ['websocket'] });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.API_GATEWAY)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdMPData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_API_GATEWAY_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.API_GATEWAY} pingHistory`)),
  take(1),
  map(message => setInitDataAction('prod', SERVICE_KEY.API_GATEWAY, message)),
);

const setInitData = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_API_GATEWAY_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.API_GATEWAY} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyApiGatewayProdChangesSelector(state), apiGatewayProdStatusSelector(state)]),
  tap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      const title = message.status ? 'Api Gateway Is Back Up!' : 'Api Gateway Is Down';
      new Notification(title); // eslint-disable-line no-new
    }
  }),
  map(([message]) => setResponseAction('prod', SERVICE_KEY.API_GATEWAY, message)),
);

export default [getInitProdMPData, establishConnection, closeConnection, setInitData];
