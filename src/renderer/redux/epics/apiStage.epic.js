import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_STAGE_API_DATA, SET_INIT_STAGE_API_DATA,
} from '../actionTypes';
import { notifyApiStageChangesSelector, apiStageStatusSelector } from '../selectors/apiStage.selectors';
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
  switchMap(() => [getInitDataAction('stage', SERVICE_KEY.API)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitStageAPIData = action$ => action$.pipe(
  ofType(GET_INIT_STAGE_API_DATA),
  map(message => setInitDataAction('stage', SERVICE_KEY.API, message)),
);

const startApiStageListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_STAGE_API_DATA),
  switchMap(() => fromEvent(socket, `[stage] ${SERVICE_KEY.API} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyApiStageChangesSelector(state), apiStageStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Api Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('stage', SERVICE_KEY.API, message),
      );
    }

    return of(setResponseAction('stage', SERVICE_KEY.API, message));
  }),
);

export default [getInitStageAPIData, establishConnection, closeConnection, startApiStageListen];
