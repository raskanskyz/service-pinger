import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_STAGE_ISSUES_DATA, SET_INIT_STAGE_ISSUES_DATA,
} from '../actionTypes';
import { notifyIssuesStageChangesSelector, issuesStageStatusSelector } from '../selectors/issuesStage.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction } from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io(process.env.SERVER_ADDRESS, { transports: ['websocket'], path: '/version-tracker/socket.io' });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('stage', SERVICE_KEY.ISSUES)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitStageIssuesData = action$ => action$.pipe(
  ofType(GET_INIT_STAGE_ISSUES_DATA),
  map(message => setInitDataAction('stage', SERVICE_KEY.ISSUES, message)),
);

const startIssuesStageListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_STAGE_ISSUES_DATA),
  switchMap(() => fromEvent(socket, `[stage] ${SERVICE_KEY.ISSUES} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyIssuesStageChangesSelector(state), issuesStageStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Issues Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('stage', SERVICE_KEY.ISSUES, message),
      )
    }

    return of(setResponseAction('stage', SERVICE_KEY.ISSUES, message));
  })
);

export default [getInitStageIssuesData, establishConnection, closeConnection, startIssuesStageListen];
