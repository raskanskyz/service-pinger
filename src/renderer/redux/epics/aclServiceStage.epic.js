import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_STAGE_ACL_SERVICE_DATA, SET_INIT_STAGE_ACL_SERVICE_DATA,
} from '../actionTypes';
import { notifyAclServiceStageChangesSelector, aclServiceStageStatusSelector } from '../selectors/aclServiceStage.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction } from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io(`ws://${process.env.SERVER_ADDRESS}`, { transports: ['websocket'], path: '/version-tracker/socket.io' });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('stage', SERVICE_KEY.ACL_SERVICE)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitStageAclServiceData = action$ => action$.pipe(
  ofType(GET_INIT_STAGE_ACL_SERVICE_DATA),
  map(message => setInitDataAction('stage', SERVICE_KEY.ACL_SERVICE, message)),
);

const startAclServiceStageListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_STAGE_ACL_SERVICE_DATA),
  switchMap(() => fromEvent(socket, `[stage] ${SERVICE_KEY.ACL_SERVICE} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyAclServiceStageChangesSelector(state), aclServiceStageStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Acl Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('stage', SERVICE_KEY.ACL_SERVICE, message),
      )
    }

    return of(setResponseAction('stage', SERVICE_KEY.ACL_SERVICE, message));
  })
);

export default [getInitStageAclServiceData, establishConnection, closeConnection, startAclServiceStageListen];
