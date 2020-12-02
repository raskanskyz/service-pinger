import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_STAGE_PROVISIONING_DATA, SET_INIT_STAGE_PROVISIONING_DATA,
} from '../actionTypes';
import { notifyProvisioningStageChangesSelector, provisioningStageStatusSelector } from '../selectors/provisioningStage.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction } from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io(`ws://${process.env.SERVER_ADDRESS}`, { transports: ['websocket'], path: '/version-tracker/socket.io' });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('stage', SERVICE_KEY.PROVISIONING)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitStageProvisioningData = action$ => action$.pipe(
  ofType(GET_INIT_STAGE_PROVISIONING_DATA),
  map(message => setInitDataAction('stage', SERVICE_KEY.PROVISIONING, message)),
);

const startProvisioningStageListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_STAGE_PROVISIONING_DATA),
  switchMap(() => fromEvent(socket, `[stage] ${SERVICE_KEY.PROVISIONING} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyProvisioningStageChangesSelector(state), provisioningStageStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Provisioning Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('stage', SERVICE_KEY.PROVISIONING, message),
      )
    }

    return of(setResponseAction('stage', SERVICE_KEY.PROVISIONING, message));
  })
);

export default [getInitStageProvisioningData, establishConnection, closeConnection, startProvisioningStageListen];
