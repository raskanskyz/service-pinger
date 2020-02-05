import { ofType } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';

import { SHOW_NOTIFICATION } from '../actionTypes';

const establishConnection = action$ => action$.pipe(
  ofType(SHOW_NOTIFICATION),
  tap(({ payload }) => {
    const title = `${payload.serviceName} ${payload.status ? 'Is Back Up!' : 'Is Down!'}`;
    // eslint-disable-next-line no-new
    new Notification(title, {
      ...(payload.downtimeDuration && { body: `service has been down for approx. ${payload.downtimeDuration} seconds` }),
    }); // eslint-disable-line no-new
  }),
  ignoreElements(),
);

export default [establishConnection];
