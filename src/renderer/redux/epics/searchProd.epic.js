import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_SEARCH_DATA, SET_INIT_PROD_SEARCH_DATA,
} from '../actionTypes';
import { notifySearchProdChangesSelector, searchProdStatusSelector } from '../selectors/searchProd.selectors';
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
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.SEARCH)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdSearchData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_SEARCH_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.SEARCH, message)),
);

const startSearchProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_SEARCH_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.SEARCH} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifySearchProdChangesSelector(state), searchProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Search Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.SEARCH, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.SEARCH, message));
  }),
);

export default [getInitProdSearchData, establishConnection, closeConnection, startSearchProdListen];
