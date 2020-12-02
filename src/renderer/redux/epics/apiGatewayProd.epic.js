import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_API_GATEWAY_DATA, SET_INIT_PROD_API_GATEWAY_DATA,
} from '../actionTypes';
import { notifyApiGatewayProdChangesSelector, apiGatewayProdStatusSelector } from '../selectors/apiGatewayProd.selectors';
import {
  getInitDataAction, setInitDataAction, setResponseAction, showNotificationAction,
} from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io(`ws://${process.env.SERVER_ADDRESS}`, { transports: ['websocket'], path: '/version-tracker/socket.io' });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.API_GATEWAY)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdApiGatewayData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_API_GATEWAY_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.API_GATEWAY, message)),
);

const setInitData = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_API_GATEWAY_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.API_GATEWAY} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyApiGatewayProdChangesSelector(state), apiGatewayProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Api Gateway', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.API_GATEWAY, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.API_GATEWAY, message));
  }),
);

export default [getInitProdApiGatewayData, establishConnection, closeConnection, setInitData];
