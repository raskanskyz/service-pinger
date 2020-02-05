import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, switchMap, map, tap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_ISSUES_DATA, SET_INIT_PROD_ISSUES_DATA,
} from '../actionTypes';
import { notifyIssuesProdChangesSelector, issuesProdStatusSelector } from '../selectors/issuesProd.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction } from '../actions';
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

const getInitProdISSUESData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_ISSUES_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ISSUES, message)),
);

const startIssuesProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_ISSUES_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ISSUES} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyIssuesProdChangesSelector(state), issuesProdStatusSelector(state)]),
  tap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      const title = message.status ? 'Issues Service Is Back Up!' : 'Issues Service Is Down';
      new Notification(title); // eslint-disable-line no-new
    }
  }),
  map(([message]) => setResponseAction('prod', SERVICE_KEY.ISSUES, message)),
);

export default [getInitProdISSUESData, establishConnection, closeConnection, startIssuesProdListen];
