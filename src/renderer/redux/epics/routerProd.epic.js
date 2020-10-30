import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_ROUTER_DATA, SET_INIT_PROD_ROUTER_DATA,
} from '../actionTypes';
import { notifyRouterProdChangesSelector, routerProdStatusSelector } from '../selectors/routerProd.selectors';
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
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.ROUTER)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdRouterData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_ROUTER_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ROUTER, message)),
);

const startRouterProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_ROUTER_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ROUTER} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyRouterProdChangesSelector(state), routerProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Router Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.ROUTER, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.ROUTER, message));
  }),
);

export default [getInitProdRouterData, establishConnection, closeConnection, startRouterProdListen];
