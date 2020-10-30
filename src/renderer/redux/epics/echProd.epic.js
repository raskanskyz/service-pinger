import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_ECH_DATA, SET_INIT_PROD_ECH_DATA,
} from '../actionTypes';
import { notifyEchProdChangesSelector, echProdStatusSelector } from '../selectors/echProd.selectors';
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
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.ECH)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdEchData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_ECH_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ECH, message)),
);

const startEchProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_ECH_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ECH} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyEchProdChangesSelector(state), echProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Ech', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.ECH, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.ECH, message));
  }),
);

export default [getInitProdEchData, establishConnection, closeConnection, startEchProdListen];
