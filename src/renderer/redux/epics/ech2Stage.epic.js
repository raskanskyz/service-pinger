import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_STAGE_ECH2_DATA, SET_INIT_STAGE_ECH2_DATA,
} from '../actionTypes';
import { notifyEch2StageChangesSelector, ech2StageStatusSelector } from '../selectors/ech2Stage.selectors';
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
  switchMap(() => [getInitDataAction('stage', SERVICE_KEY.ECH2)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitStageEch2Data = action$ => action$.pipe(
  ofType(GET_INIT_STAGE_ECH2_DATA),
  map(message => setInitDataAction('stage', SERVICE_KEY.ECH2, message)),
);

const startEch2StageListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_STAGE_ECH2_DATA),
  switchMap(() => fromEvent(socket, `[stage] ${SERVICE_KEY.ECH2} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyEch2StageChangesSelector(state), ech2StageStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Ech2 0', downtimeDuration: message.downtimeDuration }),
        setResponseAction('stage', SERVICE_KEY.ECH2, message),
      );
    }

    return of(setResponseAction('stage', SERVICE_KEY.ECH2, message));
  }),
);

export default [getInitStageEch2Data, establishConnection, closeConnection, startEch2StageListen];
