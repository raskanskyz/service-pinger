import { ofType } from 'redux-observable';
import io from 'socket.io-client';
import { fromEvent } from 'rxjs';
import {
  withLatestFrom, switchMap, map, tap,
} from 'rxjs/operators';

import {
  ESTABLISH_CONNECTION, CLOSE_CONNECTION, GET_INIT_PROD_MP_DATA, SET_INIT_PROD_MP_DATA,
} from '../actionTypes';
import { notifyOrgDashboardProdChangesSelector, orgDashboardProdStatusSelector } from '../selectors/orgDashboardProd.selectors';
import { getInitDataAction, setResponseAction, setInitDataAction } from '../actions';
import { SERVICE_KEY } from '../../consts';

let socket;
const establishConnection = action$ => action$.pipe(
  ofType(ESTABLISH_CONNECTION),
  switchMap(() => {
    socket = io('http://localhost:3000', { transports: ['websocket'] });
    return fromEvent(socket, 'connect');
  }),
  switchMap(() => [getInitDataAction('prod', SERVICE_KEY.ORG_DASHBOARD)]),
);

const closeConnection = action$ => action$.pipe(
  ofType(CLOSE_CONNECTION),
  switchMap(() => fromEvent(socket, 'disconnect')),
);

const getInitProdMPData = action$ => action$.pipe(
  ofType(GET_INIT_PROD_MP_DATA),
  map(message => setInitDataAction('prod', SERVICE_KEY.ORG_DASHBOARD, message)),
);

const startMPProdListen = (action$, state$) => action$.pipe(
  ofType(SET_INIT_PROD_MP_DATA),
  switchMap(() => fromEvent(socket, `[prod] ${SERVICE_KEY.ORG_DASHBOARD} pong`)),
  withLatestFrom(state$),
  map(([message, state]) => [message, notifyOrgDashboardProdChangesSelector(state), orgDashboardProdStatusSelector(state)]),
  tap(([message, notifyChanges, prevStatus]) => {
    if (notifyChanges && prevStatus !== null && prevStatus !== message.status) {
      const title = message.status ? 'Org Dashboard Is Back Up!' : 'Org Dashboard Is Down';
      new Notification(title); // eslint-disable-line no-new
    }
  }),
  map(([message]) => setResponseAction('prod', SERVICE_KEY.ORG_DASHBOARD, message)),
);

export default [getInitProdMPData, establishConnection, closeConnection, startMPProdListen];
