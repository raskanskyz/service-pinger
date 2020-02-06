import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent, of } from 'rxjs';
import {
  withLatestFrom, switchMap, map, concatMap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_ACL_DATA, SET_INIT_PROD_ACL_DATA,
} from '../actionTypes';
import { notifyAclProdChangesSelector, aclProdStatusSelector } from '../selectors/aclProd.selectors';
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
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.ACL)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdAclData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_ACL_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ACL, message)),
);

const startAclProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_ACL_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ACL} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyAclProdChangesSelector(state), aclProdStatusSelector(state)]),
  concatMap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      return of(
        showNotificationAction({ status: message.status, serviceName: 'Acl', downtimeDuration: message.downtimeDuration }),
        setResponseAction('prod', SERVICE_KEY.ACL, message),
      );
    }

    return of(setResponseAction('prod', SERVICE_KEY.ACL, message));
  }),
);

export default [getInitProdAclData, establishConnection, closeConnection, startAclProdListen];
