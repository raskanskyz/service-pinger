import { combineEpics } from 'redux-observable';

// PLOP IMPORT EPICS PLACEHOLDER
import mpProdEpic from './mpProd.epic';
import apiGatewayProd from './apiGatewayProd.epic';
import aclProd from './aclProd.epic';
import apiProd from './apiProd.epic';
import orgDashboardProd from './orgDashboardProd.epic';

export default combineEpics(
  // PLOP COMBINE_EPICS PLACEHOLDER
  ...mpProdEpic,
  ...apiGatewayProd,
  ...aclProd,
  ...orgDashboardProd,
  ...apiProd,
);
