import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_API_DATA, SET_INIT_PROD_API_DATA,
} from '../actionTypes';
import { notifyApiProdChangesSelector, apiProdStatusSelector } from '../selectors/apiProd.selectors';
import {
  getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction,
} from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io(`ws://${process.env.SERVER_ADDRESS}`, { transports: ['websocket'], path: '/version-tracker/socket.io' });
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
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Api Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.API, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.API, message));
  }),
);

export default [getInitProdApiData, establishConnection, closeConnection, startApiProdListen];
