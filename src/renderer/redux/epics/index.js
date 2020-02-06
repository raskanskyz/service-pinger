import { combineEpics } from 'redux-observable';

// PLOP IMPORT EPICS PLACEHOLDER
import apiStageEpic from './apiStage.epic';
import issuesProdEpic from './issuesProd.epic';
import mpProdEpic from './mpProd.epic';
import apiGatewayProd from './apiGatewayProd.epic';
import aclProd from './aclProd.epic';
import apiProd from './apiProd.epic';
import ui from './ui.epic';

export default combineEpics(
  // PLOP COMBINE_EPICS PLACEHOLDER
  ...apiStageEpic,
  ...issuesProdEpic,
  ...mpProdEpic,
  ...apiGatewayProd,
  ...aclProd,
  ...apiProd,
  ...ui,
);
