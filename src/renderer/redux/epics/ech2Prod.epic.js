import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_ECH2_DATA, SET_INIT_PROD_ECH2_DATA,
} from '../actionTypes';
import { notifyEch2ProdChangesSelector, ech2ProdStatusSelector } from '../selectors/ech2Prod.selectors';
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
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.ECH2)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdEch2Data = action$ => action$.pipe(
  ofType(GET_INIT_PROD_ECH2_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ECH2, message)),
);

const startEch2ProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_ECH2_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ECH2} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyEch2ProdChangesSelector(state), ech2ProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Ech 2 0', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.ECH2, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.ECH2, message));
  }),
);

export default [getInitProdEch2Data, establishConnection, closeConnection, startEch2ProdListen];
