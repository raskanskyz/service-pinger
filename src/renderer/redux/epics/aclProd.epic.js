import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, switchMap, map, tap, take,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_MP_DATA, SET_INIT_PROD_MP_DATA,
} from '../actionTypes';
import { notifyAclProdChangesSelector, aclProdStatusSelector } from '../selectors/aclProd.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction } from '../actions';
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

const getInitProdMPData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_MP_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ACL} pingHistory`)),
  take(1),
  map(message => setInitDataAction('prod', SERVICE_KEY.ACL, message)),
);

const startMPProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_MP_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ACL} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyAclProdChangesSelector(state), aclProdStatusSelector(state)]),
  tap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      const title = message.status ? 'ACL Is Back Up!' : 'ACL Is Down';
      new Notification(title); // eslint-disable-line no-new
    }
  }),
  map(([message]) => setResponseAction('prod', SERVICE_KEY.ACL, message)),
);

export default [getInitProdMPData, establishConnection, closeConnection, startMPProdListen];
