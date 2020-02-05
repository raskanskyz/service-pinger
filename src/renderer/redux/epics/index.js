import { combineEpics } from 'redux-observable';

// PLOP IMPORT EPICS PLACEHOLDER
import issuesProdEpic from './issuesProd.epic';
import mpProdEpic from './mpProd.epic';
import apiGatewayProd from './apiGatewayProd.epic';
import aclProd from './aclProd.epic';
import apiProd from './apiProd.epic';

export default combineEpics(
  // PLOP COMBINE_EPICS PLACEHOLDER
  ...issuesProdEpic,
  ...mpProdEpic,
  ...apiGatewayProd,
  ...aclProd,
  ...apiProd,
);
