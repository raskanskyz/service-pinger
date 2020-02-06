import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_ISSUES_DATA, SET_INIT_PROD_ISSUES_DATA,
} from '../actionTypes';
import { notifyIssuesProdChangesSelector, issuesProdStatusSelector } from '../selectors/issuesProd.selectors';
import {
  getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction,
} from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io('http://localhost:3000', { transports: ['websocket'] });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.ISSUES)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdIssuesData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_ISSUES_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ISSUES, message)),
);

const startIssuesProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_ISSUES_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ISSUES} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyIssuesProdChangesSelector(state), issuesProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Issues Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.ISSUES, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.ISSUES, message));
  }),
);

export default [getInitProdIssuesData, establishConnection, closeConnection, startIssuesProdListen];
