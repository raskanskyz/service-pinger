import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_ACL_SERVICE_DATA, SET_INIT_PROD_ACL_SERVICE_DATA,
} from '../actionTypes';
import { notifyAclServiceProdChangesSelector, aclServiceProdStatusSelector } from '../selectors/aclServiceProd.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction, showNotificationAction } from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io(`ws://${process.env.SERVER_ADDRESS}`, { transports: ['websocket'], path: '/version-tracker/socket.io' });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.ACL_SERVICE)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdAclServiceData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_ACL_SERVICE_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ACL_SERVICE, message)),
);

const startAclServiceProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_ACL_SERVICE_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ACL_SERVICE} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyAclServiceProdChangesSelector(state), aclServiceProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Acl Service', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.ACL_SERVICE, message),
      )
    }

    return of(setResponseAction('prod', SERVICE_KEY.ACL_SERVICE, message));
  })
);

export default [getInitProdAclServiceData, establishConnection, closeConnection, startAclServiceProdListen];
